import { connection as knex } from '../../database/connection.js';
import { formatReturnDateBoard } from '../../utils/format-return-date-board.js';

const detailBoard = async (req, res) => {
    const id = req.params.id;

    try {
        const board = await knex('boards').where({ id });
        if (!board[0]) {
            return res.status(404).json({ message: 'Board not found.' });
        }

        if (board[0].user_id != req.user.id) {
            return res.status(403).json({ message: 'Denied access.' });
        }

        const boardFormattedDate = formatReturnDateBoard(board);

        const cards = await knex('cards').where({ board_id: id }).orderBy('ordenation', 'asc');
        for (let card of cards) {
            const tasks = await knex('tasks').where({ card_id: card.id }).orderBy('ordenation', 'asc');
            card.tasks = tasks;
        }
        boardFormattedDate[0].cards = cards;

        return res.status(200).json(boardFormattedDate[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export { detailBoard };
