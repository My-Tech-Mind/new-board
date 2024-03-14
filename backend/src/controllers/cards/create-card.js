import { connection as knex } from '../../database/connection.js';
import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';

import {queryDB} from '../../utils/query.js'

import {handleErrors} from '../../utils/catch-error.js'

const createCard = async (req, res) => {
    const { title, board_id } = req.body;

    try {
        const boardExists = await queryDB('boards', 'select', { id: board_id });
        if (!boardExists) {
            return res.status(404).json({ message: 'Board not found' });
        }

        const boardCards = await queryDB('cards', 'select', { board_id });
        if (boardCards.length >= 10) {
            return res.status(403).json({ message: 'Maximum number of cards per board reached' });
        }

        await refreshUpdateDateBoard(board_id);

        const newCard = await queryDB('cards', 'insert', { title, board_id, ordenation: boardCards.length + 1 });

        return res.status(201).json(newCard);
    } catch (error) {
        return handleErrors(res, error);
    }
};

export { createCard };
