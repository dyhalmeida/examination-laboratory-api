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

class UpdateLaboratoryService {
  // eslint-disable-next-line object-curly-newline
  async run({ id, name, address, status, deleted }) {
    try {
      const laboratory = await LaboratoryModel.findByPk(id, {
        attributes: ['id', 'name', 'address', 'status', 'deleted'],
      });

      await laboratory.update({
        name,
        address,
        status,
        deleted,
      });

      return laboratory;
    } catch (error) {
      console.log(colors.red('UpdateLaboratoryService: Internal server error'));
      throw new InternalServerError('Internal server error');
    }
  }
}

module.exports = new UpdateLaboratoryService();
