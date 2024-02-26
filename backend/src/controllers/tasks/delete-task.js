import { connection as knex } from '../../database/connection.js';
import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';

const deleteTask = async (req, res) => {
	const id = req.params.id;
	try{
		const taskAndBoardData = await knex('tasks')
			.join('cards', 'cards.id', '=', 'tasks.card_id')
			.select('board_id', 'tasks.id')
			.where('tasks.id', id).first();
		if(!taskAndBoardData) {
			return res.status(404).json({ message: 'Task not found.' });
		}
		const { board_id } = taskAndBoardData;
		await knex('tasks').delete().where({ id });
		refreshUpdateDateBoard(board_id);
		return res.status(204).json()
	} catch(error){
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export { deleteTask };