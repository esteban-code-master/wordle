import dotenv from 'dotenv'
import type { IEnvironment } from '../shared/entities/environment/environment'

const dirname = __dirname
process.env.NODE_ENV = process.env.NODE_ENV ?? 'development'

dotenv.config({
	path: `${dirname}/../../../config/${process.env.NODE_ENV}.env`
})

export const config: IEnvironment = {
	serverPort: Number(process.env.SERVER_PORT) ?? 5000,
	dbUsername: process.env.DB_USERNAME ?? '',
	dbPassword: process.env.DB_PASSWORD ?? '',
	dbName: process.env.DB_NAME ?? '',
	dbHost: process.env.DB_HOST ?? '127.0.0.1',
	dbPort: Number(process.env.DB_PORT) ?? 5432,
	dbDialect: 'postgres',
	secretToken: process.env.SECRET_TOKEN ?? ''
}
