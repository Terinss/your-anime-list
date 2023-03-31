import express, { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/userModel';

const authController = {
  signup: (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body.data as unknown as {
      username: string;
      password: string;
    };

    username = username.trim().toLowerCase();

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
          .catch((err: Error) => {
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
  login: (req: Request, res: Response, next: NextFunction) => {
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
      res.locals.SSID = user._id;
      // Check password
      bcrypt
        .compare(password, user.password)
        .then((result) => {
          if (!result)
            return next({
              log: 'authController.login: ERROR: Incorrect password',
              status: 400,
              message: { err: 'Incorrect password' },
            });
          // Create JWT token
          jwt.sign(
            { data: username },
            process.env.JWT_SECRET!,
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
                sameSite: 'strict',
                secure: true,
              });
              res.cookie('SSID', res.locals.SSID, {
                httpOnly: true,
                sameSite: 'strict',
                secure: true,
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
  logout: (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });
    res.clearCookie('SSID', {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });
    return next();
  },

  // Middleware function to verify user by checking if they have a valid token
  verify: (req: Request, res: Response, next: NextFunction) => {
    // Check if token exists
    if (!req.cookies.token) {
      return next({
        log: 'authController.verify: ERROR: No token found',
        status: 401,
        message: { err: 'No token found' },
      });
    }
    // Verify token
    jwt.verify(
      req.cookies.token as string,
      process.env.JWT_SECRET!,
      (err, decoded) => {
        if (err) {
          return next({
            log: `authController.verify: ERROR: Error verifying token: ${err}`,
            status: 401,
            message: { err: 'Error verifying token' },
          });
        }
        const { data } = decoded as jwt.JwtPayload;
        res.locals.currentUser = data;
        return next();
      }
    );
  },
};

export default authController;
