import { connection as knex } from '../../database/connection.js'
import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';

const createTask = async (req, res) => {
    const { title, description, card_id } = req.body;

    try {
        const existingCard = await knex('cards').select('id').where({ id: card_id }).first();
        if (!existingCard) {
            return res.status(404).json({ message: `Card with card_id = ${card_id} was not found.` });
        }

        const numberOfTasks = await knex('tasks').select('*').where({ card_id });
        if (numberOfTasks.length >= 20) {
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

        const boardId = await knex('cards').select('board_id').where({ id: card_id });
        refreshUpdateDateBoard(boardId);

        return res.status(201).json(creatingTask[0]);

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export { createTask };
