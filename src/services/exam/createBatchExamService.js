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

class CreateBatchExamService {
  async run(laboratories) {
    const transaction = await ExamModel.sequelize.transaction();
    try {
      // eslint-disable-next-line max-len
      const transactions = laboratories.map(exam => ExamModel.create(exam, { transaction }));
      const examsCreated = await Promise.all(transactions);
      await transaction.commit();
      return examsCreated;
    } catch (error) {
      await transaction.rollback();
      if (error.name === SEQUELIZE_UNIQUE_CONSTRAINT_ERROR) {
        const [itemError] = error.errors;
        console.log(
          colors.red(
            `CreateBatchExamService: Record already exists, ${itemError.message}`,
          ),
        );
        throw new SequelizeUniqueConstraintError(
          `Record already exists, ${itemError.message}`,
        );
      }
      console.log(colors.red('CreateBatchExamService: Internal server error'));
      throw new InternalServerError('Internal server error');
    }
  }
}

module.exports = new CreateBatchExamService();
