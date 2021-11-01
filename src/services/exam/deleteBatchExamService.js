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

class DeleteBatchExamService {
  async run(examsID) {
    const transaction = await ExamModel.sequelize.transaction();
    try {
      const transactions = examsID.map(id => ExamModel
        .update({ deleted: '*' }, {
          transaction,
          where: { id, status: true },
        }),
      );

      const examsDeleted = await Promise.all(transactions);
      await transaction.commit();
      return examsDeleted;
    } catch (error) {
      await transaction.rollback();
      console.log(colors.red('DeleteBatchExamService: Internal server error'));
      throw new InternalServerError('Internal server error');
    }
  }
}

module.exports = new DeleteBatchExamService();
