import { connection as knex } from '../../database/connection.js';
import format from 'date-fns/format';

const editBoard = async (req, res)=>{
	const { title, favorited } = req.body;
	const id = req.params.id;
	try{
		const boardEdit = await knex('boards').update({
			title,
            favorited,
            user_id: req.user.id,
            update_date: format(new Date(), 'yyyy-MM-dd kk:mm:ss')
		}).where('id', id).returning('*');
		const formattedCreatingBoard = boardEdit.map(board => ({
            ...board,
            creation_date: format(new Date(board.creation_date), 'yyyy-MM-dd kk:mm:ss'),
            update_date: format(new Date(board.update_date), 'yyyy-MM-dd kk:mm:ss')
        }));
		return res.status(200).json(formattedCreatingBoard[0]);
	} catch (error){
		return res.status(500).json({ message: 'Internal server error' });
	}
}

export { editBoard };