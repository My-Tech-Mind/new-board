import { connection as knex } from '../../database/connection.js';

const detailBoard = async (req, res) => {
    const idBoard = req.params.id;
    try {
        const board = await knex('boards').where('id', idBoard).first();

        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }

        const cards = await knex('cards').where('board_id', idBoard).orderBy('position', 'asc');
        
        for (let card of cards) {
            const tasks = await knex('tasks').where('card_id', card.id).orderBy('position', 'asc');
            card.tasks = tasks;
        }

        board.cards = cards;

        return res.status(200).json(board);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export { detailBoard };
