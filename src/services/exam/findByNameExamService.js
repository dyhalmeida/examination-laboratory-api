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
const NotFoundError = require('../../errors/NotFoundError');
const { NOT_FOUND_ERROR } = require('../../errors');

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
      if (!exam) throw new NotFoundError('Exam not found');
      return exam;
    } catch (error) {
      if (error.name === NOT_FOUND_ERROR) {
        console.log(colors.red('FindByNameExamService: Exam not found'));
        throw error;
      }

      console.log(colors.red('FindByNameExamService: Internal server error'));
      throw new InternalServerError('Internal server error');
    }
  }
}

module.exports = new FindByNameExamService();
