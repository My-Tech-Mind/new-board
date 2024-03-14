import { connection as knex } from '../../database/connection.js';
import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';

import { queryDB } from '../../utils/query.js';

import { handleErrors } from '../../utils/catch-error.js';

const deleteCard = async (req, res) => {
    const id = req.params.id;

    try {
        const card = await queryDB('cards', 'select', { id });
        if (!card) {
            return res.status(404).json({ message: 'Card not found.' });
        }

        const associatedTasksToTheCard = await queryDB('tasks', 'select', { card_id: id });
        if (associatedTasksToTheCard.length > 0) {
            await queryDB('tasks', 'delete', { card_id: id });
        }

        const { board_id } = card;
        await queryDB('cards', 'delete', { id });
        refreshUpdateDateBoard(board_id);

        return res.status(204).json();
    } catch (error) {
        return handleErrors(res, error);
    }
};


export { deleteCard };