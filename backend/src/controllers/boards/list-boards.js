import { connection as knex } from '../../database/connection.js';

const listBoards = async (req, res)=>{
	try{
		const boards = await knex('boards');
		return res.status(200).json(boards)
	}catch(error){
		return res.status(500).json({ message: 'Internal server error' });
	}
}

export { listBoards };