'use strict';

const table = 'users'

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
				username: {
					type: Sequelize.DataTypes.STRING(50),
					unique: true,
					allowNull: false
				},
				password: {
					type: Sequelize.DataTypes.STRING,
					allowNull: false
				}
			}
		)
	},

	async down (queryInterface) {
		await queryInterface.dropTable(table)
	}
}
