import { connection as knex } from '../../database/connection.js';
import format from 'date-fns/format';

import { formatDate } from '../../utils/format-date.js';

import {queryDB} from '../../utils/query.js'

const editBoard = async (req, res) => {
    const { title, favorited } = req.body;
    const id = req.params.id;
    try {
        const existingBoard = await queryDB('boards', 'select', { id });
        if (!existingBoard) {
            return res.status(404).json({ message: 'Board not found.' })
        }

        const boardEdit = await queryDB('boards', 'update', {
            id,
            title,
            favorited,
            user_id: req.user.id,
            update_date: format(new Date(), 'yyyy-MM-dd kk:mm:ss')
        });

        return res.status(200).json(formatDate(boardEdit)[0]);
    } catch (error) {
        return handleErrors(res, error);
    }
};

export { editBoard };
