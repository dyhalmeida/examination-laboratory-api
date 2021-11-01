/* eslint-disable max-len */
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
const InternalServerError = require('../../errors/InternalServerError');

class UpdateBatchExamService {
  // eslint-disable-next-line object-curly-newline
  async run(exams) {
    const transaction = await ExamModel.sequelize.transaction();
    const attributes = ['id', 'name', 'type', 'status', 'deleted'];
    try {
      // eslint-disable-next-line max-len
      // eslint-disable-next-line object-curly-newline
      const transactions = exams.map(({ id, name, type, status, deleted }) => ExamModel
        .findByPk(id, { transaction, attributes })
        .then(laboratoryFound => laboratoryFound.update({
          name,
          type,
          status,
          deleted,
        }, { transaction })),
      );
      const examsUpdated = await Promise.all(transactions);
      await transaction.commit();
      return examsUpdated;
    } catch (error) {
      await transaction.rollback();
      console.log(colors.red('UpdateBatchExamService: Internal server error'));
      throw new InternalServerError('Internal server error');
    }
  }
}

module.exports = new UpdateBatchExamService();
