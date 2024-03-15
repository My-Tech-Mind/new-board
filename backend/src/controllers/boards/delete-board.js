import { connection as knex } from '../../database/connection.js';

import {queryDB} from '../../utils/query.js'
import { handleErrors } from '../../utils/catch-error.js';

const deleteBoard = async (req, res) => {
    const { id } = req.params;
    try {
        const existingBoard = await queryDB('boards', 'select', { id });

        if (!existingBoard) {
            return res.status(404).json({ message: 'Board not found' });
        }

        const cardIds = await knex('cards').select('id').where('board_id', id);

        const taskIds = await knex('tasks').select('id').whereIn('card_id', cardIds.map(card => card.id));
        await knex('tasks').whereIn('id', taskIds.map(task => task.id)).delete();

        await knex('cards').where('board_id', id).delete();

        await knex('boards').where('id', id).delete();

        return res.sendStatus(200);
    } catch (error) {
        return handleErrors(res, error);
    }
};




export { deleteBoard };
