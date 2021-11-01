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
const { SEQUELIZE_UNIQUE_CONSTRAINT_ERROR } = require('../../errors');
const SequelizeUniqueConstraintError = require('../../errors/SequelizeUniqueConstraintError');
const InternalServerError = require('../../errors/InternalServerError');

class CreateBatchLaboratoryService {
  async run(laboratories) {
    const transaction = await LaboratoryModel.sequelize.transaction();
    try {
      const transactions = [];
      laboratories.forEach(laboratory => {
        transactions.push(LaboratoryModel.create(laboratory, { transaction }));
      });
      const laboratoriesCreated = await Promise.all(transactions);
      await transaction.commit();
      return laboratoriesCreated;
    } catch (error) {
      await transaction.rollback();
      if (error.name === SEQUELIZE_UNIQUE_CONSTRAINT_ERROR) {
        const [itemError] = error.errors;
        console.log(
          colors.red(
            `CreateLaboratoryService: Record already exists, ${itemError.message}`,
          ),
        );
        throw new SequelizeUniqueConstraintError(
          `Record already exists, ${itemError.message}`,
        );
      }
      console.log(colors.red('CreateLaboratoryService: Internal server error'));
      throw new InternalServerError('Internal server error');
    }
  }
}

module.exports = new CreateBatchLaboratoryService();
