import { connection as knex } from '../../database/connection.js';
import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';

const deleteCard = async (req, res) => {
    const id = req.params.id;

    try {
        const card = await knex('cards').select('*').where({ id }).first();
        if (!card) {
            return res.status(404).json({ message: 'Card not found.' });
        }

        const associatedTasksToTheCard = await knex('tasks').select('*').where({ card_id: id });
        if (associatedTasksToTheCard.length > 0) {
            const deletingAssociatedTasksToTheCard = await knex('tasks').delete().where({ card_id: id });
        }

        refreshUpdateDateBoard(card.board_id);

        const deletingCard = await knex('cards').delete().where({ id });

        return res.status(204).json();
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export { deleteCard };