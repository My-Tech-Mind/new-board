import { connection as knex } from '../../database/connection.js'

import { queryDB } from '../../utils/query.js';
import { handleErrors } from '../../utils/catch-error.js';


const detailTask = async (req, res) => {
    const id = req.params.id;
    try {
        const task = await queryDB('tasks', 'select', { id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        return res.status(200).json(task);
    } catch (error) {
        return handleErrors(res, error);
    }
};


export { detailTask };