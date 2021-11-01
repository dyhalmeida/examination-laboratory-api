/**
 * Import libs
 */
const { StatusCodes } = require('http-status-codes');

/**
 * Import services
 */
const CreateExamService = require('../../services/exam/createExamService');
const DeleteExamService = require('../../services/exam/deleteExamService');
const ListExamService = require('../../services/exam/listExamService');
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

  async index(request, response) {
    const { status = true } = request.query;
    try {
      const exams = await ListExamService.run({ status });
      return response.status(StatusCodes.OK).json(exams);
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }


  async delete(request, response) {
    const { id } = request.params;
    try {
      const laboratory = await DeleteExamService.run({ id });
      return response.status(StatusCodes.OK).json(laboratory);
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }

}

module.exports = new ExamController();
