/**
 * Import libs
 */
const { StatusCodes } = require('http-status-codes');

/**
 * Import services
 */
const CreateLaboratoryService = require('../../services/laboratory/createLaboratoryService');
const ListLaboratoryService = require('../../services/laboratory/listLaboratoryService');
const DeleteLaboratoryService = require('../../services/laboratory/deleteLaboratoryService');
const UpdateLaboratoryService = require('../../services/laboratory/updateLaboratoryService');

class LaboratoryController {
  async store(request, response) {
    const { name, address } = request.body;
    try {
      const laboratory = await CreateLaboratoryService.run({ name, address });
      return response.status(StatusCodes.CREATED).json(laboratory);
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

  async delete(request, response) {
    const { id } = request.params;
    try {
      const laboratory = await DeleteLaboratoryService.run({ id });
      return response.status(StatusCodes.OK).json(laboratory);
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }
}

module.exports = new LaboratoryController();
