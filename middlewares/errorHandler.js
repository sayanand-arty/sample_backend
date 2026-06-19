import ApiError from '../utils/apiError.js';

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unexpected error occurred';
  const response = {
    success: false,
    message,
  };

  if (err.details) {
    response.details = err.details;
  }

  if (process.env.NODE_ENV === 'development' && err.stack) {
    response.stack = err.stack;
  }

  if (!(err instanceof ApiError)) {
    console.error(err);
  }

  return res.status(statusCode).json(response);
};

export default errorHandler;
