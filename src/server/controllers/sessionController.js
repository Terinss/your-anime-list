const Session = require('../models/sessionModel');

const sessionController = {};

sessionController.startSession = (req, res, next) => {
  Session.create({ cookieId: res.locals.id }, (err, session) => {
    console.log('New session started: ', session);
  });
  return next();
};

sessionController.isLoggedIn = (req, res, next) => {
  Session.findOne({ cookieId: req.cookies.SSID }, (err, session) => {
    console.log(session);
    if (session) res.locals.isLoggedIn = true;
    else res.locals.isLoggedIn = false;
    return next();
  });
};

sessionController.logout = (req, res, next) => {
  Session.findOneAndDelete({ cookieId: req.cookies.SSID }, (err, session) => {
    if (session) console.log('session deleted');
    else console.log('Cannot find session');
    return next();
  });
};

module.exports = sessionController;
