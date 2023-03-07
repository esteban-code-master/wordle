export interface IEnvironment {
	serverPort: number
	dbUsername: string
	dbPassword: string
	dbName: string
	dbHost: string
	dbPort: number
	dbDialect: 'postgres',
	secretToken: string
}
