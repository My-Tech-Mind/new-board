import { connection as knex } from '../../database/connection.js';
import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';

import { queryDB } from '../../utils/query.js';
import { handleErrors } from '../../utils/catch-error.js';


const editTask = async (req, res) => {
    const { title, description, card_id, ordenation } = req.body;
    const id = req.params.id;
    try {
        const tasks = await queryDB('tasks', 'select', { id });
        if (!tasks) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        const card = await queryDB('cards', 'select', { id: card_id });
        if (!card) {
            return res.status(404).json({ message: 'Card not found.' });
        }
        const editedTask = await queryDB('tasks', 'update', {
            id,
            title,
            description,
            card_id,
            ordenation
        });
        refreshUpdateDateBoard(card.board_id);
        return res.status(200).json(editedTask[0]);
    } catch (error) {
        return handleErrors(res, error);
    }
};


export { editTask };