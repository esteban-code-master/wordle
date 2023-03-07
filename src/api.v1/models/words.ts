import { Sequelize, DataTypes, Model } from 'sequelize'

export default (sequelize: Sequelize) => {
	class WordsFactory extends Model {
		// static associate(models: any){
			
		// }
	}

	WordsFactory.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false
			}
		},
		{
			sequelize,
			modelName: 'words',
			freezeTableName: true,
			updatedAt: false,
			createdAt: false,
		}
	)

  	return WordsFactory
}
