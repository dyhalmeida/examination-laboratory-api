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

class UpdateExamService {
  // eslint-disable-next-line object-curly-newline
  async run({ id, name, type, status, deleted }) {
    try {
      const exam = await ExamModel.findByPk(id, {
        attributes: ['id', 'name', 'type', 'status', 'deleted'],
      });

      await exam.update({
        name,
        type,
        status,
        deleted,
      });

      return exam;
    } catch (error) {
      console.log(colors.red('UpdateExamService: Internal server error'));
      throw new InternalServerError('Internal server error');
    }
  }
}

module.exports = new UpdateExamService();
