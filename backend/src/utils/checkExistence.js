import { connection as knex } from '../database/connection.js';

const checkExistence = async (table, params) => {
    try {
        const result = await knex(table).where(params).first();
        return !!result;
    } catch (error) {
        throw error;
    }
};

export { checkExistence };
