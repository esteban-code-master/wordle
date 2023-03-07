'use strict';

const table = 'games'

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
            userId: {
              type: Sequelize.DataTypes.INTEGER,
              allowNull: false,
              references: {
                model: 'users',
                key: 'id'
              },
            },
            wordId: {
              type: Sequelize.DataTypes.INTEGER,
              allowNull: false,
              references: {
                model: 'words',
                key: 'id'
              }
            },
            winner: {
              type: Sequelize.DataTypes.BOOLEAN,
              allowNull: false
            },
            date: {
              type: Sequelize.DataTypes.DATE,
              allowNull: false
            }
          }
        )
    },

    async down (queryInterface) {
      await queryInterface.dropTable(table)
    }
};
