const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Login route
router.post('/login', authController.login, (req, res, next) => {
  console.log('res.locals.currentUser: ', res.locals.currentUser);
  res.status(200).json({ success: true, currentUser: res.locals.currentUser });
});

router.post(
  '/logout',
  authController.verify,
  authController.logout,
  (req, res) => {
    res.status(200).json({ success: true, message: 'Successfully logged out' });
  }
);

router.post('/signup', authController.signup, (req, res) => {
  res.status(200).json({ success: true, message: 'User created' });
});

router.get('/auth', authController.verify, (req, res) => {
  res.status(200).json({ success: true, currentUser: res.locals.currentUser });
});

module.exports = router;
