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
const NotFoundError = require('../../errors/NotFoundError');
const { NOT_FOUND_ERROR } = require('../../errors');

class FindOneLaboratoryService {
  async run({ laboratoryID }) {
    try {
      const laboratory = await LaboratoryModel.findByPk(laboratoryID, {
        where: { status: true, deleted: '' },
        attributes: ['id', 'name', 'address', 'status', 'created_at'],
      });

      if (!laboratory) {
        throw new NotFoundError('Lab not found');
      }

      return laboratory;
    } catch (error) {
      if (error.name === NOT_FOUND_ERROR) {
        console.log(colors.red('FindOneLaboratoryService: Lab not found'));
        throw error;
      }
      console.log(
        colors.red('FindOneLaboratoryService: Internal server error'),
      );
      throw new InternalServerError('Internal server error');
    }
  }
}

module.exports = new FindOneLaboratoryService();
