import { connection as knex } from '../../database/connection.js';
import format from 'date-fns/format';
import { formatReturnDateBoard } from '../../utils/format-return-date-board.js';

const editBoard = async (req, res) => {
	const { title, favorited } = req.body;
	const id = req.params.id;

	try {
		const board = await knex('boards').where({ id }).first();
		if (!board) {
			return res.status(404).json({ message: 'Board not found.' });
		}

		const editingBoard = await knex('boards').update({
			title,
			favorited,
			user_id: req.user.id,
			update_date: format(new Date(), 'yyyy-MM-dd kk:mm:ss')
		}).where({ id }).returning('*');

		return res.status(200).json(formatReturnDateBoard(editingBoard)[0]);
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export { editBoard };
