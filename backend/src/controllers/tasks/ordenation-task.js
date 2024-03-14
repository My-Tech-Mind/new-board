import { connection as knex } from '../../database/connection.js';
import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';

const ordenationTask = async (req, res) => {
	const { taskSourceDestination, taskSourcePosition, cardIdSource, cardIdDestination, taskId } = req.body;
	const limitEditIncrement = taskSourcePosition - 1;
	try{
		const task = await knex('tasks').where({ id: taskId }).first();
		if(!task){
			return res.status(404).json({ message: 'Task not found'});
		}

		if (cardIdSource !== cardIdDestination) {
			const card = await knex('cards').where({id: cardIdDestination}).first();
			if (!card) {
				return res.status(404).json({ message: 'Card not found'})
			}
			await knex('tasks').where({ id: taskId }).update({card_id: cardIdDestination});
		}

		await knex.transaction(async trx => {
			if (taskSourceDestination === taskSourcePosition) {
				return res.status(403).json({ message: 'The new position cannot be the same as the current one'})
			}
		  try {
		  	if (taskSourceDestination < taskSourcePosition) {
			    await trx('tasks')
			      .where({ id: taskId })
			      .where({card_id: cardIdDestination})
			      .update({ ordenation: -1 });

			    await trx('tasks')
			      .whereBetween('ordenation', [taskSourceDestination, limitEditIncrement])
			      .where({card_id: cardIdDestination})
			      .increment('ordenation', 1);

			    await trx('tasks')
			      .where('ordenation', -1)
			      .where({card_id: cardIdDestination})
			      .update({ ordenation: taskSourceDestination });

		  	} else{
		  		const limitEditDecrement = Number(taskSourcePosition) + 1;
			    await trx('tasks')
			      .where({ id: taskId })
			      .where({card_id: cardIdDestination})
			      .update({ ordenation: -1 });

			    await trx('tasks')
			      .whereBetween('ordenation', [limitEditDecrement, taskSourceDestination])
			      .where({card_id: cardIdDestination})
			      .decrement('ordenation', 1);

			    await trx('tasks')
			      .where({ id: taskId })
			      .where({card_id: cardIdDestination})
			      .update({ ordenation: taskSourceDestination });
		  	}
		    return res.status(200).json()
		  } catch (err) {
		    	return res.status(500).json({ message: 'Internal server error' });
		  }
		});
	}catch(error){
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export { ordenationTask };