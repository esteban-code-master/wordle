import { Sequelize } from 'sequelize'
import { config } from 'src/api.v1/environment/environment'
import { readdirSync } from 'fs'
import path from 'path'
import user from 'src/api.v1/models/user'

const sequelizeConnection: Sequelize = new Sequelize(
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

const basename = path.basename(__filename)
const dbConnection: Sequelize = sequelizeConnection
interface Idb extends Partial<Sequelize>{
	sequelize?: any,
	users?: Sequelize
}
const db: Idb = {}
const d = user(sequelizeConnection)
const get = async (files: any, intancedb: any) => {
	return new Promise(async (resolve, reject) => {
		for await (const file of files) {
			import(`./${file}`).then((model) => {
				const intance = model.default(dbConnection)
				intancedb[intance.name] = intance
			})
		}

		resolve(true)
	})
}

const files = readdirSync(__dirname).filter((file) => {
	return (
		file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts'
	)
})

get(files, db).then((succesfull) => {
	Object.keys(db).forEach((modelName) => {
		if (db[modelName as keyof typeof db].associate) {
			db[modelName as keyof typeof db].associate(db)
		}
	})
	db.sequelize = dbConnection
	db.Sequelize = Sequelize
})

export default db
