import { connection as knex } from '../../database/connection.js';
import format from 'date-fns/format';
import { formatDate } from '../../utils/format-date.js'

const editBoard = async (req, res) => {
	const { title, favorited } = req.body;
	const id = req.params.id;
	try {
		const existingBoard = await knex('boards').select('id').where({ id }).first();
		if (!existingBoard) {
			return res.status(404).json({ message: 'Board not found.' })
		}

		const boardEdit = await knex('boards').update({
			title,
			favorited,
			user_id: req.user.id,
			update_date: format(new Date(), 'yyyy-MM-dd kk:mm:ss')
		}).where('id', id).returning('*');

		return res.status(200).json(formatDate(boardEdit)[0]);
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
}

export { editBoard };
