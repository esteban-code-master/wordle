import { Sequelize, DataTypes, Model, DATE } from 'sequelize'

export default (sequelize: Sequelize) => {
	class GamesFactory extends Model {
		// static associate(models: any){
			
		// }
	}

	GamesFactory.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false
			},
			userId: {
				type: DataTypes.STRING,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id'
				}
			},
			wordId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'word',
					key: 'id'
				}
			},
			winner: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			date: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW()
			}
		},
		{
			sequelize,
			modelName: 'games',
			freezeTableName: true,
			updatedAt: false,
			createdAt: false,
		}
	)

  	return GamesFactory
}
