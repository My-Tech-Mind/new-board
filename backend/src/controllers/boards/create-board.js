import { connection as knex } from '../../database/connection.js';
import format from 'date-fns/format';
import { formatReturnDateBoard } from '../../utils/format-return-date-board.js';
import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';

const createBoard = async (req, res) => {
    const { title, favorited } = req.body;

    try {
        const numberOfBoards = await knex('boards').where({ user_id: req.user.id });
        if (numberOfBoards.length >= 5) {
            return res.status(403).json({
                message: `Alert: The maximum number of boards (5) per user has been reached.` +
                    `New boards cannot be created due to this limit.`
            });
        }

        const creatingBoard = await knex('boards').insert({
            title,
            favorited,
            user_id: req.user.id,
            creation_date: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
            update_date: format(new Date(), 'yyyy-MM-dd kk:mm:ss')
        }).returning('*');

        await knex('cards').insert([
            { title: 'to do', board_id: creatingBoard[0].id, ordenation: 1 },
            { title: 'doing', board_id: creatingBoard[0].id, ordenation: 2 },
            { title: 'done', board_id: creatingBoard[0].id, ordenation: 3 }
        ]);

        await refreshUpdateDateBoard(creatingBoard[0].id);

        const boardFormattedDate = formatReturnDateBoard(creatingBoard);

        const cards = await knex('cards').where({ board_id: creatingBoard[0].id }).orderBy('ordenation', 'asc');
        for (let card of cards) {
            const tasks = await knex('tasks').where({ card_id: card.id }).orderBy('ordenation', 'asc');
            card.tasks = tasks;
        }
        boardFormattedDate[0].cards = cards;

        return res.status(201).json(boardFormattedDate[0]);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export { createBoard };
