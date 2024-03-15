import { connection as knex } from '../database/connection.js';

const queryDB = async (table, action, params, identifier = 'id') => {
    try {
        let result;
        switch (action) {
            case 'insert':
                result = await knex(table).insert(params).returning('*');
                break;
            case 'update':
                result = await knex(table).update(params).where(identifier, params[identifier]).returning('*');
                break;
            case 'select':
                result = await knex(table).where(identifier, params[identifier]).first();
                break;
            case 'delete':
                result = await knex(table).where(identifier, params[identifier]).delete();
                break;
            case 'select_all':
                result = await knex(table);
                break;
            default:
                throw new Error('Invalid action');
        }
        return result;
    } catch (error) {
        throw error;
    }
};

export { queryDB };
