const User = require('../models/userModel');
const mongoose = require('mongoose');
const userController = {};

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  res.locals.isSignedIn = false;
  User.findOne({ username: username }, (err, user) => {
    if (!user || user.password !== password) {
      return next({
        log: 'Error occurred in userController.loginUser: Invalid username / password',
        status: 400,
        message: { success: false, err: 'Invalid username / password' },
      });
    }
    console.log('Correct password');
    res.locals.isSignedIn = true;
    res.locals.id = JSON.parse(JSON.stringify(user._id));
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
