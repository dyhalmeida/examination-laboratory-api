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

class FindOrCreateExamService {
  // eslint-disable-next-line object-curly-newline
  async run({ name, type, status, deleted }) {
    try {
      const [exam] = await ExamModel.findOrCreate({
        // eslint-disable-next-line object-curly-newline
        where: { name, type, status, deleted },
      });
      return exam;
    } catch (error) {
      console.log(colors.red('FindOrCreateExamService: Internal server error'));
      throw new InternalServerError('Internal server error');
    }
  }
}

module.exports = new FindOrCreateExamService();
