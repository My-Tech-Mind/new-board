import knex from 'knex';
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DATABASE } = process.env;
export const connection = knex({
	  client: 'pg',
	  connection: {
	    host : DB_HOST,
	    port : DB_PORT,
	    user : DB_USER,
	    password : DB_PASSWORD,
	    database : DATABASE
  }
})