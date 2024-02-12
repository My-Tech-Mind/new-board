import { connection as knex } from '../../database/connection.js';
import format from 'date-fns/format';

const listBoards = async (req, res)=>{
	try{
		const boards = await knex('boards');
		const formattedListgBoard = boards.map(board => ({
            ...board,
            creation_date: format(new Date(board.creation_date), 'yyyy-MM-dd kk:mm:ss'),
            update_date: format(new Date(board.update_date), 'yyyy-MM-dd kk:mm:ss')
        }));
		return res.status(200).json(formattedListgBoard)
	}catch(error){
		console.error(error)
		return res.status(500).json({ message: 'Internal server error' });
	}
}

export { listBoards };