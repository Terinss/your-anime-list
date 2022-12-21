const express = require('express');
const userController = require('../controllers/userController');

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

router.post('/login', userController.loginUser, (req, res, next) => {
  res.status(200).json({ success: true, redirect: '/trending' });
});

router.post('/signup', userController.createUser, (req, res, next) => {
  res.status(200).send('User created');
  // User.create(req.body)
  //   .then((user) => {
  //     console.log(`User ${user.username} created.`);
  //     res.status(200).json(user);
  //   })
  //   .catch((err) => {
  //     return next({
  //       log: `Error occurred while creating new user: ${err.message}`,
  //       status: 400,
  //       message: { err: err.message },
  //     });
  //   });
});

module.exports = router;
