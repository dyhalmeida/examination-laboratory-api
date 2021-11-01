'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('exams_labs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      exam_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'exams', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      laboratory_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'laboratories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, _) => {
    await queryInterface.dropTable('exams_labs');
  },
};
