import { connection as knex } from '../../database/connection.js';
import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';

const deleteCard = async (req, res) => {
    const id = req.params.id;

    try {
        const card = await knex('cards').where({ id }).first();
        if (!card) {
            return res.status(404).json({ message: 'Card not found.' });
        }

        await knex('tasks').where({ card_id: id }).delete();
        const { board_id } = card
        await knex('cards').where({ id }).delete();
        refreshUpdateDateBoard(board_id);

        return res.sendStatus(204);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export { deleteCard };