import { connection as knex } from '../../database/connection.js';
import { formatReturnDateBoard } from '../../utils/format-return-date-board.js';

const listBoards = async (req, res) => {
	const favorited = req.query.favorited;

	try {
		if (favorited) {
			const boards = await knex('boards').where({ favorited: true });
			return res.status(200).json(formatReturnDateBoard(boards));
		}

		const boards = await knex('boards');

		return res.status(200).json(formatReturnDateBoard(boards));
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
}

export { listBoards };

