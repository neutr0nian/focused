const httpStatus = require("http-status-codes").StatusCodes;
//error-handling middleware function always contains 4 arguments

module.exports = {
  logErrors: (error, req, res, next) => {
    console.log(error);
    next(error);
  },
  pageNotFoundError: (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.json({
      message: "Page not found",
    });
  },
  internalServerError: (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.log(`ERROR occurred: ${error.stack}`);
    res.status(errorCode);
    res.send(`${errorCode} | Sorry, our application is
➥experiencing a problem!`);
  },
};
