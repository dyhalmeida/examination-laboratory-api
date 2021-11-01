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

class FindByNameExamService {
  // eslint-disable-next-line object-curly-newline
  async run({ name }) {
    try {
      const exam = await ExamModel.findOne({
        // eslint-disable-next-line object-curly-newline
        where: { name },
        attributes: ['id', 'name', 'type', 'status', 'deleted'],
        include: {
          association: 'laboratories',
          attributes: ['id', 'name', 'address', 'status', 'deleted'],
          through: { attributes: [] },
        },
      });
      return exam;
    } catch (error) {
      console.log(error);
      console.log(colors.red('FindByNameExamService: Internal server error'));
      throw new InternalServerError('Internal server error');
    }
  }
}

module.exports = new FindByNameExamService();
