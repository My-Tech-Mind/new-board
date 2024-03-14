import { connection as knex } from '../../database/connection.js'
import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';

import { queryDB } from '../../utils/query.js';
import { handleErrors } from '../../utils/catch-error.js';

const createTask = async (req, res) => {
    const { title, description, card_id } = req.body;

    try {
        const card = await queryDB('cards', 'select', { id: card_id });
        if (!card) {
            return res.status(404).json({ message: `Card with card_id = ${card_id} was not found.` });
        }

        const numberOfTasks = await queryDB('tasks', 'select', { card_id });
        if (numberOfTasks.length >= 20) {
            return res.status(403).json({ message: 'You can only have 20 tasks created in a card.' })
        }

        const maximumOrdenationNumberTasks = await knex('tasks').max('ordenation');
        const ordenationNumber = maximumOrdenationNumberTasks[0].max + 1;

        const creatingTask = await queryDB('tasks', 'insert', {
            title,
            description,
            card_id,
            ordenation: ordenationNumber
        });

        refreshUpdateDateBoard(card.board_id);

        return res.status(201).json(creatingTask[0]);
    } catch (error) {
        return handleErrors(res, error);
    }
};


export { createTask };
