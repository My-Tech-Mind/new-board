import { connection as knex } from '../../database/connection.js';

import {queryDB} from '../../utils/query.js'

const deleteBoard = async (req, res) => {
    const { id } = req.params;
    try {
        const existingBoard = await queryDB('boards', 'select', { id });

        if (!existingBoard) {
            return res.status(404).json({ message: 'Board not found' });
        }

        await queryDB('tasks', 'delete', { card_id: knex('cards').select('id').where('board_id', id) });
        await queryDB('cards', 'delete', { board_id: id });
        await queryDB('boards', 'delete', { id });

        return res.sendStatus(200);
    } catch (error) {
        return handleErrors(res, error);
    }
};


export { deleteBoard };
