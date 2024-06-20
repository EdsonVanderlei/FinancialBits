import { configDotenv } from 'dotenv';
import type { Knex } from 'knex';

configDotenv();

const config = {
	development: {
		client: 'mysql2',
		connection: {
			host: process.env.DATABASE_CONNECTION_HOST,
			port: process.env.DATABASE_CONNECTION_PORT,
			user: process.env.DATABASE_CONNECTION_USER,
			password: process.env.DATABASE_CONNECTION_PASSWORD,
			database: process.env.DATABASE_CONNECTION_DATABASE,
		} as Knex.MySql2ConnectionConfig,
		migrations: {
			directory: __dirname + '/database/migrations',
			tableName: 'migrations',
		},
	} as Knex.Config,
	test: {
		client: 'sqlite',
		connection: {
			filename: './database/test.sqlite3',
		},
		migrations: {
			directory: __dirname + '/database/migrations',
			tableName: 'migrations',
		},
		useNullAsDefault: true,
	} as Knex.Config,
};

export default config;
