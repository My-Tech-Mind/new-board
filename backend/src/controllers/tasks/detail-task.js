import { connection as knex } from '../../database/connection.js'

const detailTask = async (req, res) => {
	const id = req.params.id;
	try{
		const task = await knex('tasks').where({ id }).first();
		if (!task) {
			return res.status(404).json({ message: 'Task not found.' });
		}
		return res.status(200).json(task);
	}catch(error){
		console.error(error)
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export { detailTask };