import { connection as knex } from '../../database/connection.js';
import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';

const deleteTask = async (req, res) => {
	const id = req.params.id;
	try{
		const task = await knex('tasks').where({ id }).first();
		if(!task) {
			return res.status(404).json({ message: 'Task not found.' });
		}
		const { card_id, ...taskData } = task;
		await knex('tasks').delete().where({ id });
		const card = await knex('cards').where({ id: card_id}).first();
		const { board_id, ...boardData } = card;
		refreshUpdateDateBoard(board_id);
		return res.status(204).json()
	} catch(error){
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export { deleteTask };