const { Model, DataTypes } = require('sequelize');

class Laboratory extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      deleted: DataTypes.STRING,
    }, { sequelize });
  }

  static associate(models) {
    /**
     * Many to many association
     * A laboratory has many exams
     * */
    this.belongsToMany(models.Exam, { foreignKey: 'laboratory_id', through: 'exams_labs', as: 'exams' });
  }
}

module.exports = Laboratory;
