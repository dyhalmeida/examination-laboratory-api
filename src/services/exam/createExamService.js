/**
 * Import libs
 */
const colors = require('colors');

/**
 * Import Models
 */
const ExamModel = require('../../models/Exam');

/**
 * Import errors
 */
const { SEQUELIZE_UNIQUE_CONSTRAINT_ERROR } = require('../../errors');
const SequelizeUniqueConstraintError = require('../../errors/SequelizeUniqueConstraintError');
const InternalServerError = require('../../errors/InternalServerError');

class CreateExamService {
  async run({ name, type }) {
    try {
      return await ExamModel.create({ name, type });
    } catch (error) {
      if (error.name === SEQUELIZE_UNIQUE_CONSTRAINT_ERROR) {
        const [itemError] = error.errors;
        console.log(
          colors.red(
            `CreateExamService: Record already exists, ${itemError.message}`,
          ),
        );
        throw new SequelizeUniqueConstraintError(
          `Record already exists, ${itemError.message}`,
        );
      }
      console.log(
        colors.red(
          'CreateExamService: Internal server error',
        ),
      );
      throw new InternalServerError('Internal server error');
    }
  }
}

module.exports = new CreateExamService();
