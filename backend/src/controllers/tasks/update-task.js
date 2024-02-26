import { connection as knex } from '../../database/connection.js';
import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';

const updateTask = async (req, res) => {
	const { title, description, card_id, ordenation } = req.body;
	const id = req.params.id;
	try{
		const taskAndBoardData = await knex('tasks').join('cards', 'cards.id', '=', 'tasks.card_id').where('tasks.id', id).first();
		if (!taskAndBoardData) {
			return res.status(404).json({ message: 'Task not found.'});
		}
		const { board_id, ...remainingData} = taskAndBoardData;
		const card = await knex('cards').where({ id: card_id }).first();
		if (!card) {
			return res.status(404).json({ message: 'Card not found.'});
		}
		const editedTask = await knex('tasks').update({
			title, 
			description, 
			card_id,
			ordenation
		}).where({ id }).returning('*');
		refreshUpdateDateBoard(board_id);
		return res.status(200).json(editedTask[0]);
	}catch(error){
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export { updateTask };