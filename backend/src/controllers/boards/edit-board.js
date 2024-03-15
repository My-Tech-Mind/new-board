import { connection as knex } from '../../database/connection.js';
import {checkExistence} from '../../utils/checkExistence.js'

import { formatDate } from '../../utils/format-date.js';

import { handleErrors } from '../../utils/catch-error.js';

import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';



const editBoard = async (req, res) => {
    const { title, favorited } = req.body;
    const id = req.params.id;

    try {
        const boardExists = await checkExistence('boards', { id });

        if (!boardExists) {
            return res.status(404).json({ message: 'Board not found.' });
        }

        await knex('boards')
            .where('id', id)
            .update({
                title,
                favorited,
                user_id: req.user.id,
                update_date: new Date().toISOString()
            });

            const updatedBoard = await knex('boards')
            .where('id', id)
            .first();
        
        return res.status(200).json(formatDate([updatedBoard])[0]);
        
    } catch (error) {
        return handleErrors(res, error);
    }
};



export { editBoard };
