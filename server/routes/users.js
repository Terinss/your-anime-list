const express = require('express');
const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('Got request for users.');
  res.status(200).json([
    {
      username: 'Terrence',
      age: 30,
    },
    {
      username: 'Kenny',
      age: 22,
    },
  ]);
});

router.post(
  '/login',
  userController.verifyUser,
  sessionController.startSession,
  cookieController.setSSIDcookie,
  (req, res, next) => {
    res.status(200).json({ success: true });
  }
);

router.get('/isloggedin', sessionController.isLoggedIn, (req, res, next) => {
  res.status(200).json({ isLoggedIn: res.locals.isLoggedIn });
});

router.get('/logout', sessionController.logout, (req, res, next) => {
  res.status(200).json({ message: 'Successfully logged out' });
});

router.post('/signup', userController.createUser, (req, res, next) => {
  res.status(200).send('User created');
});

module.exports = router;
