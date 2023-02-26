const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel.js');

const router = express.Router();

const authController = {
  signup: (req, res, next) => {
    const { username, password } = req.body;
    console.log(
      `received request to signup with username: ${username} and password: ${password}`
    );
    // Check if username and password are provided
    if (!username || !password) {
      return next({
        log: 'authController.signup: ERROR: Missing username or password',
        status: 400,
        message: { err: 'Missing username or password' },
      });
    }
    // Check if username and password are at least 5 characters long
    if (username.length < 5 || password.length < 5) {
      return next({
        log: 'authController.signup: ERROR: Username or password is too short',
        status: 400,
        message: {
          err: 'Username or password is too short, must be 5 characters minimum',
        },
      });
    }
    // Check if username already exists
    User.findOne({ username })
      .then((user) => {
        if (user) {
          return next({
            log: 'authController.signup: ERROR: Username already exists',
            status: 400,
            message: { err: 'Username already exists' },
          });
        }
      })
      .catch((err) => {
        return next({
          log: `authController.signup: ERROR: Error finding user: ${err}`,
          status: 500,
          message: { err: 'Error finding user' },
        });
      });
    // Hash password
    const saltRounds = 10;
    bcrypt
      .hash(password, saltRounds)
      .then((hash) => {
        // Create new user
        const newUser = new User({
          username,
          password: hash,
        });
        // Save new user
        newUser
          .save()
          .then(() => {
            return next();
          })
          .catch((err) => {
            return next({
              log: `authController.signup: ERROR: Error saving user: ${err}`,
              status: 500,
              message: { err: 'Error saving user' },
            });
          });
      })
      .catch((err) => {
        return next({
          log: `authController.signup: ERROR: Error hashing password: ${err}`,
          status: 500,
          message: { err: 'Error hashing password' },
        });
      });
  },

  // Login Middleware
  login: (req, res, next) => {
    const { username, password } = req.body;
    // Check if username and password are provided
    if (!username || !password) {
      return next({
        log: 'authController.login: ERROR: Missing username or password',
        status: 400,
        message: { err: 'Missing username or password' },
      });
    }

    // Check database for user
    User.findOne({ username }).then((user) => {
      // Check if user exists
      if (!user) {
        return next({
          log: 'authController.login: ERROR: User does not exist',
          status: 400,
          message: { err: 'User does not exist' },
        });
      }
      res.locals.currentUser = username;
      // Check password
      bcrypt
        .compare(password, user.password)
        .then((result) => {
          console.log('jwt secret: ', process.env.JWT_SECRET);
          if (!result)
            return next({
              log: 'authController.login: ERROR: Incorrect password',
              status: 400,
              message: { err: 'Incorrect password' },
            });
          // Create JWT token
          jwt.sign(
            { data: username },
            process.env.JWT_SECRET,
            {
              expiresIn: '1h',
            },
            (err, token) => {
              if (err)
                return next({
                  log: `authController.login: ERROR: Error creating token: ${err}`,
                  status: 500,
                  message: { err: 'Error creating token' },
                });
              // Set cookie
              res.cookie('token', token, {
                httpOnly: true,
                sameSite: true,
              });
              return next();
            }
          );
        })
        .catch((err) => {
          return next({
            log: `authController.login: ERROR: Error comparing password: ${err}`,
            status: 500,
            message: { err: 'Error comparing password' },
          });
        });
    });
  },
  // Middleware function to logout user by clearing their cookie
  logout: (req, res, next) => {
    res.clearCookie('token');
    return next();
  },

  // Middleware function to verify user by checking if they have a valid token
  verify: (req, res, next) => {
    // Check if token exists
    if (!req.cookies.token) {
      return next({
        log: 'authController.verify: ERROR: No token found',
        status: 401,
        message: { err: 'No token found' },
      });
    }
    // Verify token
    jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
      res.locals.currentUser = decoded.data;
      if (err) {
        return next({
          log: `authController.verify: ERROR: Error verifying token: ${err}`,
          status: 401,
          message: { err: 'Error verifying token' },
        });
      }
      return next();
    });
  },
};

module.exports = authController;