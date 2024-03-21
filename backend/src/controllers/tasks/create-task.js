import { connection as knex } from '../../database/connection.js'
import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';

const createTask = async (req, res) => {
    const { title, description, card_id } = req.body;

    try {
        const card = await knex('cards').where({ id: card_id }).first();
        if (!card) {
            return res.status(404).json({ message: `Card with card_id = ${card_id} was not found.` });
        }

        const numberOfTasks = await knex('tasks').where({ card_id });
        if (numberOfTasks.length >= 20) {
            return res.status(403).json({ message: 'You can only have 20 tasks in a card.' })
        }

        const creatingTask = await knex('tasks').insert({
            title,
            description,
            card_id,
            ordenation: numberOfTasks.length + 1
        }).returning('*');

        refreshUpdateDateBoard(card.board_id);

        return res.status(201).json(creatingTask[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export { createTask };
