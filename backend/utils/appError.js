/**
 * @description: AppError class to handle errors in the application
 * @param {string} message - error message
 * @param {number} statusCode - HTTP status code
 * @returns {object} AppError instance
 * @example
 * const error = new AppError('Resource not found', 404)
 * console.log(error.message) // 'Resource not found'
 * console.log(error.statusCode) // 404
 * console.log(error.status) // 'Fail'
 * console.log(error.isOperational) // true
 */
class AppError extends Error{
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.status = statusCode >= 400 && statusCode < 500 ? 'Fail' : 'Error'

    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AppError