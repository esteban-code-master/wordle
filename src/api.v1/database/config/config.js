const dotenv = require('dotenv')
const dirname = __dirname
process.env.NODE_ENV = process.env.NODE_ENV ?? 'development'

dotenv.config({
	path: `${dirname}/../../../../config/${process.env.NODE_ENV}.env`
})

module.exports = {
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: process.env.DB_DIALECT
	}
}
