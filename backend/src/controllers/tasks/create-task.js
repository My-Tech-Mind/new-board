import { connection as knex } from '../../database/connection.js'
import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';

const createTask = async (req, res) => {
    const { title, description, card_id } = req.body;

    try {
        const card = await knex('cards').where({ id: card_id }).first();
        if (!card) {
            return res.status(404).json({ message: `Card with card_id = ${card_id} was not found.` });
        }

        const cardAndBoardOwner = await knex('cards')
            .join('boards', 'boards.id', '=', 'cards.board_id')
            .select('user_id as owner')
            .where('cards.id', card_id)
            .first();

        if (cardAndBoardOwner.owner != req.user.id) {
            return res.status(403).json({ message: 'Denied access.' });
        }

        const numberOfTasks = await knex('tasks').where({ card_id });
        if (numberOfTasks.length >= 20) {
            return res.status(403).json({
                message: `Alert: The maximum number of tasks (20) for this card has been reached. ` +
                    `New tasks cannot be added to this card due to this limit.`
            });
        }

        const creatingTask = await knex('tasks').insert({
            title,
            description,
            card_id,
            ordenation: numberOfTasks.length
        }).returning('*');

        refreshUpdateDateBoard(card.board_id);

        return res.status(201).json(creatingTask[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export { createTask };
