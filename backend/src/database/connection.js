import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config()

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DATABASE } = process.env;

const connection = knex({
	client: 'pg',
	connection: {
		host: DB_HOST,
		port: DB_PORT,
		user: DB_USER,
		password: DB_PASSWORD,
		database: DATABASE,
		// ssl: { rejectUnauthorized: false }
	}
});

export { connection };