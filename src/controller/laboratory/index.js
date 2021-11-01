/**
 * Import libs
 */
const { StatusCodes } = require('http-status-codes');

/**
 * Import services
 */
const CreateLaboratoryService = require('../../services/laboratory/createLaboratoryService');

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
}

module.exports = new LaboratoryController();
