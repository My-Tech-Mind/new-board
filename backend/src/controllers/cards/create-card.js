import { connection as knex } from '../../database/connection.js';
import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';

const createCard = async (req, res) => {
    const { title, board_id } = req.body;

    try {
        const boardExists = await knex('boards').where('id', board_id).first();
        if (!boardExists) {
            return res.status(404).json({ message: 'Board not found' });
        }

        const boardCards = await knex('cards').where('board_id', board_id);
        if (boardCards.length >= 10) {
            return res.status(403).json({ message: 'Maximum number of cards per board reached' });
        }

        await refreshUpdateDateBoard(board_id);

        const newCard = await knex('cards').insert({ title, board_id, ordenation: boardCards.length + 1 }).returning('*');

        return res.status(201).json(newCard);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export { createCard };
