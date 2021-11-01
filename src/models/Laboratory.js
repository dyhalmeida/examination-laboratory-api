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
}

module.exports = Laboratory;
