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

  static associate(models) {
    /**
     * Many to many association
     * A Exam has many laboratories
     * */
    this.belongsToMany(models.Laboratory, { foreignKey: 'exam_id', through: 'exams_labs', as: 'laboratories' });
  }
}

module.exports = Exam;
