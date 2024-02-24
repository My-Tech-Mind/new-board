import { connection as knex } from '../../database/connection.js';
import format from 'date-fns/format';
import { formatDate } from '../../utils/format-date.js'

const createBoard = async (req, res) => {
    const { title, favorited } = req.body;

    try {
        const numberOfBoards = await knex('boards').select('*');
        if (numberOfBoards.length >= 5) {
            return res.status(403).json({ message: 'You can only have 5 boards created.' })
        }

        const creatingBoard = await knex('boards').insert({
            title,
            favorited,
            user_id: req.user.id,
            creation_date: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
            update_date: format(new Date(), 'yyyy-MM-dd kk:mm:ss')
        }).returning(['id', 'title', 'favorited', 'user_id', 'creation_date', 'update_date']);

        return res.status(200).json(formatDate(creatingBoard)[0]);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export { createBoard };
