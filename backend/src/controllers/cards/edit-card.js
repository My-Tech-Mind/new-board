import { connection as knex } from '../../database/connection.js';
import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';

const editCard = async (req, res) => {
    const id = req.params.id;
    const { title, board_id, ordenation } = req.body;

    try {
        const card = await knex('cards').select('*').where({ id }).first();
        if (!card) {
            return res.status(404).json({ message: 'Card not found.' });
        }

        const existingBoard = await knex('boards').select('id').where({ id: board_id }).first();
        if (!existingBoard) {
            return res.status(404).json({ message: `Board with board_id = ${board_id} was not found.` });
        }

        const cardEdit = await knex('cards').update({
            title,
            board_id,
            ordenation
        }).where({ id }).returning('*');

        refreshUpdateDateBoard(board_id);

        return res.status(200).json(cardEdit[0]);
    } catch (error) {
        return res.status(500).json({ message: ' Internal server error' });
    }
};

export { editCard };