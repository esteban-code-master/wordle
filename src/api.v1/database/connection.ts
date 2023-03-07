import { Sequelize } from 'sequelize'
import { config } from '@environment/environment'

const connection = new Sequelize(
	config.dbName,
	config.dbUsername,
	config.dbPassword,
	{
		host: config.dbHost,
		port: config.dbPort,
		dialect: config.dbDialect,
		pool: {
			idle: 80000,
			min: 20,
			max: 60,
			acquire: 80000
		}
	}
)

export default connection
