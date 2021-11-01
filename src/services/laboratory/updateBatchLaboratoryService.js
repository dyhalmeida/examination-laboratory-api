/* eslint-disable max-len */
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

class UpdateBatchLaboratoryService {
  // eslint-disable-next-line object-curly-newline
  async run(laboratories) {
    const transaction = await LaboratoryModel.sequelize.transaction();
    const attributes = ['id', 'name', 'address', 'status', 'deleted'];
    try {
      // eslint-disable-next-line max-len
      // eslint-disable-next-line object-curly-newline
      const transactions = laboratories.map(({ id, name, address, status, deleted }) => LaboratoryModel
        .findByPk(id, { transaction, attributes })
        .then(laboratoryFound => laboratoryFound.update({
          name,
          address,
          status,
          deleted,
        }, { transaction })),
      );
      const laboratoriesUpdated = await Promise.all(transactions);
      await transaction.commit();
      return laboratoriesUpdated;
    } catch (error) {
      await transaction.rollback();
      console.log(colors.red('UpdateBatchLaboratoryService: Internal server error'));
      throw new InternalServerError('Internal server error');
    }
  }
}

module.exports = new UpdateBatchLaboratoryService();
