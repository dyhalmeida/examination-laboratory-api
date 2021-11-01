const { Model, DataTypes } = require('sequelize');

class Exam extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      deleted: DataTypes.STRING,
    }, { sequelize });
  }
}

module.exports = Exam;
