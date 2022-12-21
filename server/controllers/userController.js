const User = require('../models/userModel');
const mongoose = require('mongoose');
const userController = {};

userController.loginUser = (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  User.findOne({ username: username }, (err, user) => {
    console.log(user);
    if (user.password !== password) {
      return next({
        log: 'Error occurred in userController.loginUser: Invalid password',
        status: 400,
        message: { success: false, err: 'Invalid password' },
      });
    }
    console.log('Correct password');
    return next();
  });
};

userController.createUser = (req, res, next) => {
  User.create(req.body)
    .then((user) => {
      console.log(`User ${user.username} created.`);
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error occurred while creating new user: ${err.message}`,
        status: 400,
        message: { err: err.message },
      });
    });
};

module.exports = userController;
