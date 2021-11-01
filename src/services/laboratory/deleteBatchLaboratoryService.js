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

class DeleteBatchLaboratoryService {
  async run(laboratoriesID) {
    const transaction = await LaboratoryModel.sequelize.transaction();
    try {
      const transactions = laboratoriesID.map(id => LaboratoryModel
        .update({ deleted: '*' }, {
          transaction,
          where: { id, status: true },
        }),
      );

      const laboratoriesDeleted = await Promise.all(transactions);
      await transaction.commit();
      return laboratoriesDeleted;
    } catch (error) {
      await transaction.rollback();
      console.log(colors.red('DeleteBatchLaboratoryService: Internal server error'));
      throw new InternalServerError('Internal server error');
    }
  }
}

module.exports = new DeleteBatchLaboratoryService();
