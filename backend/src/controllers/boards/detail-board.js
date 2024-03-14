import { connection as knex } from '../../database/connection.js';

import { formatDate } from '../../utils/format-date.js';

const detailBoard = async (req, res) => {
    const idBoard = req.params.id;
    try {
        const board = await knex('boards').where('id', idBoard).first();

        if (!board[0]) {
            return res.status(404).json({ message: 'Board not found' });
        }

        const boardFormateData = formatDate(board);

        const cards = await knex('cards').where('board_id', idBoard).orderBy('ordenation', 'asc');
        
        for (let card of cards) {
            const tasks = await knex('tasks').where('card_id', card.id).orderBy('ordenation', 'asc');
            card.tasks = tasks;
        }

        boardFormateData[0].cards = cards

        return res.status(200).json(boardFormateData[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export { detailBoard };
