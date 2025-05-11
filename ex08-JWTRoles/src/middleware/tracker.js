const logger = (req, res, next) => {
  console.log(`Request Method: ${req.method}, URL: ${req.url} by User ID: ${req.user.userId}`);
  next();
};

module.exports = logger;
