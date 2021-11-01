/**
 * Import libs
 */
const { StatusCodes } = require('http-status-codes');

/**
 * Import services
 */
const CreateLaboratoryService = require('../../services/laboratory/createLaboratoryService');
const CreateBatchLaboratoryService = require('../../services/laboratory/createBatchLaboratoryService');
const ListLaboratoryService = require('../../services/laboratory/listLaboratoryService');
const FindOneLaboratoryService = require('../../services/laboratory/findOneLaboratoryService');
const DeleteLaboratoryService = require('../../services/laboratory/deleteLaboratoryService');
const DeleteBatchLaboratoryService = require('../../services/laboratory/deleteBatchLaboratoryService');
const UpdateLaboratoryService = require('../../services/laboratory/updateLaboratoryService');
const UpdateBatchLaboratoryService = require('../../services/laboratory/updateBatchLaboratoryService');

const FindOrCreateExamService = require('../../services/exam/findOrCreateExamService');
class LaboratoryController {
  async associate(request, response) {
    const { laboratoryID } = request.params;
    // eslint-disable-next-line object-curly-newline
    const { name, type, status, deleted } = request.body;
    try {
      const laboratory = await FindOneLaboratoryService.run({ laboratoryID });
      const exam = await FindOrCreateExamService.run({
        name,
        type,
        status,
        deleted,
      });

      await laboratory.addExam(exam);

      return response.status(StatusCodes.CREATED).json();
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }

  async store(request, response) {
    const { name, address } = request.body;
    try {
      const laboratory = await CreateLaboratoryService.run({ name, address });
      return response.status(StatusCodes.CREATED).json(laboratory);
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }

  async storeAll(request, response) {
    const { laboratories } = request.body;
    try {
      const laboratoriesCreated = await CreateBatchLaboratoryService
        .run(laboratories);
      return response.status(StatusCodes.CREATED).json(laboratoriesCreated);
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }

  async index(request, response) {
    const { status = true } = request.query;
    try {
      const laboratories = await ListLaboratoryService.run({ status });
      return response.status(StatusCodes.OK).json(laboratories);
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }

  async update(request, response) {
    const { id } = request.params;
    // eslint-disable-next-line object-curly-newline
    const { name, address, status, deleted } = request.body;
    try {
      const laboratory = await UpdateLaboratoryService.run({
        id,
        name,
        address,
        status,
        deleted,
      });
      return response.status(StatusCodes.OK).json(laboratory);
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }

  async updateAll(request, response) {
    const { laboratories } = request.body;
    try {
      const laboratoriesUpdated = await UpdateBatchLaboratoryService.run(laboratories);
      return response.status(StatusCodes.OK).json(laboratoriesUpdated);
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }

  async delete(request, response) {
    const { id } = request.params;
    try {
      const laboratory = await DeleteLaboratoryService.run({ id });
      return response.status(StatusCodes.OK).json(laboratory);
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }

  async deleteAll(request, response) {
    const { laboratoriesID } = request.body;
    try {
      await DeleteBatchLaboratoryService.run(laboratoriesID);
      return response.status(StatusCodes.OK).json();
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }
}

module.exports = new LaboratoryController();
