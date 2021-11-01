/**
 * Import libs
 */
const { StatusCodes } = require('http-status-codes');

/**
 * Import services
 */
const CreateExamService = require('../../services/exam/createExamService');
class ExamController {
  async store(request, response) {
    const { name, type } = request.body;
    try {
      const exam = await CreateExamService.run({ name, type });
      return response.status(StatusCodes.CREATED).json(exam);
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }

}

module.exports = new ExamController();
