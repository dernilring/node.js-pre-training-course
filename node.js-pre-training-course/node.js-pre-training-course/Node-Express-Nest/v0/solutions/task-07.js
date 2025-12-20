// Express.js error handler middleware for ToDo API
// TODO: implement

function errorMiddleware(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message;
  res.statusCode(statusCode).json({
    message: message,
    error: err,
  });
}
module.exports = errorMiddleware;
