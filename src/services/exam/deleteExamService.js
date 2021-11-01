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

class DeleteExamService {
  async run({ id }) {
    try {
      const laboratory = await ExamModel.update(
        { deleted: '*' },
        {
          where: { id, status: true },
        },
      );
      return laboratory;
    } catch (error) {
      console.log(colors.red('DeleteExamService: Internal server error'));
      throw new InternalServerError('Internal server error');
    }
  }
}

module.exports = new DeleteExamService();
