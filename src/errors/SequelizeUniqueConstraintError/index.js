/**
 * Import libs
 */
const { StatusCodes } = require('http-status-codes');

class SequelizeUniqueConstraintError extends Error {
  constructor(message) {
    super(message);
    this.name = 'SequelizeUniqueConstraintError';
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = SequelizeUniqueConstraintError;
