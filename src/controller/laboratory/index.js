/**
 * Import libs
 */
const { StatusCodes } = require('http-status-codes');

/**
 * Import services
 */
const CreateLaboratoryService = require('../../services/laboratory/createLaboratoryService');
const ListLaboratoryService = require('../../services/laboratory/listLaboratoryService');

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
}

module.exports = new LaboratoryController();
