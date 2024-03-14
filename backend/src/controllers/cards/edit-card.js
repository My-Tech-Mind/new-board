import { connection as knex } from '../../database/connection.js';
import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';

import { queryDB } from '../../utils/query.js';
import { handleErrors } from '../../utils/catch-error.js';

const editCard = async (req, res) => {
    const id = req.params.id;
    const { title, board_id, ordenation } = req.body;

    try {
        const card = await queryDB('cards', 'select', { id });
        if (!card) {
            return res.status(404).json({ message: 'Card not found.' });
        }

        const existingBoard = await queryDB('boards', 'select', { id: board_id });
        if (!existingBoard) {
            return res.status(404).json({ message: `Board with board_id = ${board_id} was not found.` });
        }

        const cardEdit = await queryDB('cards', 'update', { id, title, board_id, ordenation });
        refreshUpdateDateBoard(board_id);

        return res.status(200).json(cardEdit[0]);
    } catch (error) {
        return handleErrors(res, error);
    }
};


export { editCard };