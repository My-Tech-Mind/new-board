import { connection as knex } from '../../database/connection.js';
import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';

const editTask = async (req, res) => {
	const { title, description, card_id, ordenation } = req.body;
	const id = req.params.id;

	try {
		const task = await knex('tasks').where({ id }).first();
		if (!task) {
			return res.status(404).json({ message: 'Task not found.' });
		}

		const card = await knex('cards').where({ id: card_id }).first();
		if (!card) {
			return res.status(404).json({ message: `Card with card_id = ${card_id} was not found.` });
		}

		const numberOfTasks = await knex('tasks').where({ card_id });
		if (numberOfTasks.length >= 20) {
			return res.status(403).json({
				message: `Alert: The maximum number of tasks (20) for this card has been reached.
                New tasks cannot be added to this card due to this limit.`
			});
		}

		const editingTask = await knex('tasks').update({
			title,
			description,
			card_id,
			ordenation
		}).where({ id }).returning('*');

		refreshUpdateDateBoard(card.board_id);

		return res.status(200).json(editingTask[0]);
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export { editTask };