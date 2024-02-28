import { connection as knex } from '../../database/connection.js';
import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';

const editTask = async (req, res) => {
	const { title, description, card_id, ordenation } = req.body;
	const id = req.params.id;
	try{
		const tasks = await knex('tasks').where({id}).first();
		if (!tasks) {
			return res.status(404).json({ message: 'Task not found.'});
		}
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
		refreshUpdateDateBoard(card.board_id);
		return res.status(200).json(editedTask[0]);
	}catch(error){
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export { editTask };