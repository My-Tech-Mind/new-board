import { connection as knex } from '../../database/connection.js';
import { formatDate } from '../../utils/format-date.js';
const listBoards = async (req, res)=>{
	const favorited = req.query.favorited;
	try{
		if(favorited){
			const boards = await knex('boards').where('favorited', true);
			return res.status(200).json(formatDate(boards));
		}
		const boards = await knex('boards');
		return res.status(200).json(formatDate(boards));
	}catch(error){
		console.error(error)
		return res.status(500).json({ message: 'Internal server error' });
	}
}

export { listBoards };
