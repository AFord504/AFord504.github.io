const json2html = require("node-json2html");

module.exports = function () {
  return function (req, res, next) {
    // TODO 2: Create the converter function
    if (req.result) {
      if (req.accepts("html")) {
      }
    } else {
      next();
    }
  };
};
