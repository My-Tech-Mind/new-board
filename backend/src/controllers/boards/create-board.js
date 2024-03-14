import { connection as knex } from '../../database/connection.js';
import format from 'date-fns/format';

import { formatDate } from '../../utils/format-date.js'

import {queryDB} from '../../utils/query.js'

import {handleErrors} from '../../utils/catch-error.js'

const createBoard = async (req, res) => {
    const { title, favorited } = req.body;
    try {
        const numberOfBoards = await queryDB('boards', 'select_all');
        if (numberOfBoards.length >= 5) {
            return res.status(403).json({ message: 'You can only have 5 boards created.' })
        }

        const creatingBoard = await queryDB('boards', 'insert', {
            title,
            favorited,
            user_id: req.user.id,
            creation_date: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
            update_date: format(new Date(), 'yyyy-MM-dd kk:mm:ss')
        });

        return res.status(200).json(formatDate(creatingBoard)[0]);
    } catch (error) {
        return handleErrors(res, error);
    }
};


export { createBoard };
