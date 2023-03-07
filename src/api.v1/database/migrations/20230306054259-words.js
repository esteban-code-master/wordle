'use strict';

const table = 'words'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(table,
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        name: {
          type: Sequelize.DataTypes.STRING,
          unique: true,
          allowNull: false
        }
      }
    )
  },

  async down (queryInterface) {
    await queryInterface.dropTable(table)
  }
};
