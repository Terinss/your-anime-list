const cookieController = {};

cookieController.setSSIDcookie = (req, res, next) => {
  res.cookie('SSID', res.locals.id, { httpOnly: true });
  return next();
};

module.exports = cookieController;
