// errorMiddleware.js

const handleApiError = (err, req, res, next) => {
  console.error(err.name);
  console.error(err.message);

  let status = 500;
  let message = "Internal server error";

  if (err.name === "ValidationError") {
    // Mongoose validation error
    status = 400;
    message = "Validation failed. Please check your input data.";
  } else if (err.name === "MongoServerError" && err.code === 11000) {
    // MongoDB duplicate key error
    status = 400;
    message = "Duplicate entry. A similar record already exists.";
  } else if (err.message === "Not found" || err.name === "CastError") {
    // Resource not found error
    status = 404;
    message = "The requested resource was not found.";
  }

  res
    .status(status)
    .json({ status: "error", code: err.message, error: message });
};

const handleLoginError = (error, req, res, next) => {
  if (error.message.includes("Email")) {
    return res.status(400).json({
      status: "error",
      message: error.message,
      errors: [{ field: "email", message: "Invalid Email" }],
    });
  } else if (error.message.includes("Password")) {
    return res.status(400).json({
      status: "error",
      message: error.message,
      errors: [{ field: "password", message: "Invalid Password" }],
    });
  }
  return res.status(400).json({
    status: "error",
    message: error.message,
  });
};

module.exports = { handleApiError, handleLoginError };
