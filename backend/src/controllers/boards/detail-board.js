import { connection as knex } from '../../database/connection.js';

const detailBoard = async (req, res) => {
    const idBoard = req.params.id;
    try {
        const lookingForBoard = await knex('boards')
            .select('id', 'title', 'favorited', 'user_id')
            .where('id', idBoard)
            .returning('*');

            const lookingForCards = await knex('cards').where('board_id', idBoard).returning('*')
            
            
            const lookingForTasks = await knex('tasks')


            return res.status(200).json(lookingForBoard, lookingForCards, lookingForTasks)


    } catch (error) {


        return res.status(500).json({ mensagem: 'Internal server error' })
    }
}



export { detailBoard }