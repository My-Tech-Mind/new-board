import { connection as knex } from '../../database/connection.js';

const queryDB = async (table, action, params) => {
    try {
        let result;
        switch (action) {
            case 'insert':
                result = await knex(table).insert(params).returning('*');
                break;
            case 'update':
                result = await knex(table).update(params).where('id', params.id).returning('*');
                break;
            case 'select':
                result = await knex(table).where('id', params.id).first();
                break;
            case 'delete':
                result = await knex(table).where('id', params.id).delete();
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


export {queryDB}
