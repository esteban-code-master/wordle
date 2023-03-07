import { Sequelize, DataTypes, Model } from 'sequelize'

export default (sequelize: Sequelize) => {
	class UserFactory extends Model {}

	UserFactory.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false
			}
		},
		{
			sequelize,
			modelName: 'users',
			freezeTableName: true,
			updatedAt: false,
			createdAt: false,
		}
	)

  	return UserFactory
}
