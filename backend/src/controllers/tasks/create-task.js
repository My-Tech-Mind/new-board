import { connection as knex } from '../../database/connection.js'
import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';

import { handleErrors } from '../../utils/catch-error.js';
import { checkExistence } from '../../utils/checkExistence.js';

const createTask = async (req, res) => {
    const { title, description, card_id } = req.body;

    try {
        const card = await checkExistence('cards', { id: card_id });
        console.log(card);
        if (!card) {
            return res.status(404).json({ message: `Card with card_id = ${card_id} was not found.` });
        }

        const numberOfTasks = await knex('tasks').count('id').where('card_id', card_id).first();

        if (parseInt(numberOfTasks.count) >= 20) {
            return res.status(403).json({ message: 'You can only have 20 tasks created in a card.' })
        }

        const maximumOrdenationNumberTasks = await knex('tasks').max('ordenation');
        const ordenationNumber = maximumOrdenationNumberTasks[0].max + 1;

        const creatingTask = await knex('tasks').insert({
            title,
            description,
            card_id,
            ordenation: ordenationNumber
        }).returning('*');

        refreshUpdateDateBoard(card.board_id);

        return res.status(201).json(creatingTask[0]);
    } catch (error) {
        return handleErrors(res, error);
    }
};


export { createTask };
