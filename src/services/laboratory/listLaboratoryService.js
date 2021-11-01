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

class ListLaboratoryService {
  async run({ status }) {
    try {
      const laboratories = await LaboratoryModel.findAll({
        where: { status, deleted: '' },
        attributes: ['id', 'name', 'address', 'status', 'created_at'],
      });
      return laboratories;
    } catch (error) {
      console.log(colors.red('ListLaboratoryService: Internal server error'));
      throw new InternalServerError('Internal server error');
    }
  }
}

module.exports = new ListLaboratoryService();
