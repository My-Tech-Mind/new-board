import { connection as knex } from '../../database/connection.js';
import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';

import { queryDB } from '../../utils/query.js';
import { handleErrors } from '../../utils/catch-error.js';


const deleteTask = async (req, res) => {
    const id = req.params.id;

    try {
        const taskAndBoardData = await knex('tasks')
            .join('cards', 'cards.id', '=', 'tasks.card_id')
            .select('board_id', 'tasks.id')
            .where('tasks.id', id).first();
        if (!taskAndBoardData) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        const { board_id } = taskAndBoardData;
        await queryDB('tasks', 'delete', { id });
        refreshUpdateDateBoard(board_id);

        return res.status(204).json();
    } catch (error) {
        return handleErrors(res, error);
    }
};


export { deleteTask };