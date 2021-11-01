/**
 * Import libs
 */
const colors = require('colors');

/**
 * Import Models
 */
const LaboratoryModel = require('../../models/Laboratory');

/**
 * Import errors
 */
const InternalServerError = require('../../errors/InternalServerError');

class DeleteLaboratoryService {
  async run({ id }) {
    try {
      const laboratory = await LaboratoryModel.update(
        { deleted: '*' },
        {
          where: { id, status: true },
        },
      );
      return laboratory;
    } catch (error) {
      console.log(colors.red('DeleteLaboratoryService: Internal server error'));
      throw new InternalServerError('Internal server error');
    }
  }
}

module.exports = new DeleteLaboratoryService();
