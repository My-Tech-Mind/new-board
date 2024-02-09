import { connection as knex } from '../../database/connection.js';
import format from 'date-fns/format';

const createBoard = async (req, res) => {
    const { title, favorited } = req.body;

    try{
        const numberOfBoards = await knex('boards').select('*');
        if(numberOfBoards.length >= 5) {
            return res.status(403).json({message: 'You can only have 5 boards created.'})
        }

        const creatingBoard = await knex('boards').insert({
            title,
            favorited,
            user_id: 2,
            creation_date: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
            update_date: format(new Date(), 'yyyy-MM-dd kk:mm:ss')
        }).returning(['id', 'title', 'favorited', 'user_id', 'creation_date', 'update_date']);

        const formattedCreatingBoard = creatingBoard.map(board => ({
            ... board,
            creation_date: format(new Date(board.creation_date), 'yyyy-MM-dd kk:mm:ss'),
            update_date: format(new Date(board.update_date), 'yyyy-MM-dd kk:mm:ss')
        }))
        
        return res.status(200).json(formattedCreatingBoard[0]);
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
};

export { createBoard };
