import { connection as knex } from '../../database/connection.js';
import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';

import { queryDB } from '../../utils/query.js';

import { handleErrors } from '../../utils/catch-error.js';

const deleteCard = async (req, res) => {
    const id = req.params.id;

    try {
        const card = await knex('cards').select('*').where({ id }).first();
        if (!card) {
            return res.status(404).json({ message: 'Card not found.' });
        }

        const associatedTasksToTheCard = await knex('tasks').select('*').where({ card_id: id });
        if (associatedTasksToTheCard.length > 0) {
            await knex('tasks').delete().where({ card_id: id });
        }

        await knex('cards').delete().where({ id });
        await refreshUpdateDateBoard(card.board_id);

        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};




export { deleteCard };