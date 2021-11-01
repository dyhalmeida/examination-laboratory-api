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

class FindOneExamService {
  // eslint-disable-next-line object-curly-newline
  async run({ examID }) {
    try {
      const exam = await ExamModel.findOne({
        // eslint-disable-next-line object-curly-newline
        where: { id: examID },
      });
      return exam;
    } catch (error) {
      console.log(colors.red('FindOneExamService: Internal server error'));
      throw new InternalServerError('Internal server error');
    }
  }
}

module.exports = new FindOneExamService();
