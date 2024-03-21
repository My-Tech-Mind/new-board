import { connection as knex } from '../../database/connection.js';
import format from 'date-fns/format';
import { formatReturnDateBoard } from '../../utils/format-return-date-board.js';

const createBoard = async (req, res) => {
    const { title, favorited } = req.body;

    try {
        const numberOfBoards = await knex('boards');
        if (numberOfBoards.length >= 5) {
            return res.status(403).json({ message: 'You can only have 5 boards.' });
        }

        const creatingBoard = await knex('boards').insert({
            title,
            favorited,
            user_id: req.user.id,
            creation_date: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
            update_date: format(new Date(), 'yyyy-MM-dd kk:mm:ss')
        }).returning('*');

        return res.status(201).json(formatReturnDateBoard(creatingBoard)[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export { createBoard };
