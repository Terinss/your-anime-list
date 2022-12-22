const Session = require('../models/sessionModel');

const sessionController = {};

sessionController.startSession = (req, res, next) => {
  Session.create({ cookieId: res.locals.id }, (err, session) => {
    console.log('New session started: ', session);
  });
  return next();
};

module.exports = sessionController;
