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

class ListExamService {
  async run({ status }) {
    try {
      const exams = await ExamModel.findAll({
        where: { status, deleted: '' },
        attributes: ['id', 'name', 'type', 'status', 'created_at'],
      });
      return exams;
    } catch (error) {
      console.log(colors.red('ListExamService: Internal server error'));
      throw new InternalServerError('Internal server error');
    }
  }
}

module.exports = new ListExamService();
