import { connection as knex } from '../../database/connection.js';

import { queryDB } from '../../utils/query.js';
import { handleErrors } from '../../utils/catch-error.js';


const deleteUser = async (req, res) => {
    try {
        await queryDB('users', 'delete', { id: req.user.id });

        return res.status(204).json();

    } catch (error) {
        return handleErrors(res, error);
    }
};


export { deleteUser };