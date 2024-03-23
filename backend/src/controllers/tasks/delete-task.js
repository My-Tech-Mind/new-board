import { connection as knex } from '../../database/connection.js';
import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';

const deleteTask = async (req, res) => {
	const id = req.params.id;

	try {
		const taskAndBoardData = await knex('tasks')
			.join('cards', 'cards.id', '=', 'tasks.card_id')
			.join('boards', 'boards.id', '=', 'cards.board_id')
			.select('board_id', 'boards.user_id as boardOwner', 'tasks.id')
			.where('tasks.id', id)
			.first();

		if (!taskAndBoardData) {
			return res.status(404).json({ message: 'Task not found.' });
		}

		if (taskAndBoardData.boardOwner != req.user.id) {
			return res.status(403).json({ message: 'Denied access.' });
		}

		const { board_id } = taskAndBoardData;
		await knex('tasks').where({ id }).delete();
		refreshUpdateDateBoard(board_id);

		return res.sendStatus(204);
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export { deleteTask };