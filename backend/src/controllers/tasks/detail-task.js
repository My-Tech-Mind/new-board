import { connection as knex } from '../../database/connection.js';

const detailTask = async (req, res) => {
	const id = req.params.id;

	try {
		const task = await knex('tasks').where({ id }).first();
		if (!task) {
			return res.status(404).json({ message: 'Task not found.' });
		}

		const taskAndCardAndBoardOwner = await knex('tasks')
			.join('cards', 'cards.id', '=', 'tasks.card_id')
			.join('boards', 'boards.id', '=', 'cards.board_id')
			.select('boards.user_id as boardOwner')
			.where('tasks.id', id)
			.first();

		if (taskAndCardAndBoardOwner.boardOwner != req.user.id) {
			return res.status(403).json({ message: 'Denied access.' });
		}

		return res.status(200).json(task);
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export { detailTask };