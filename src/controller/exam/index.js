/**
 * Import libs
 */
const { StatusCodes } = require('http-status-codes');

/**
 * Import services
 */
const CreateExamService = require('../../services/exam/createExamService');
const CreateBatchExamService = require('../../services/exam/createBatchExamService');

const DeleteExamService = require('../../services/exam/deleteExamService');
const ListExamService = require('../../services/exam/listExamService');
const UpdateExamService = require('../../services/exam/updateExamService');

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

  async storeAll(request, response) {
    const { exams } = request.body;
    try {
      const examsCreated = await CreateBatchExamService
        .run(exams);
      return response.status(StatusCodes.CREATED).json(examsCreated);
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

  async update(request, response) {
    const { id } = request.params;
    // eslint-disable-next-line object-curly-newline
    const { name, type, status, deleted } = request.body;
    try {
      const exam = await UpdateExamService.run({
        id,
        name,
        type,
        status,
        deleted,
      });
      return response.status(StatusCodes.OK).json(exam);
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
