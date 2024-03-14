import { connection as knex } from '../../database/connection.js';
import { formatDate } from '../../utils/format-date.js';

import {handleErrors} from '../../utils/catch-error.js';

const listBoards = async (req, res) => {
    const favorited = req.query.favorited;
    try {
        if (favorited) {
            const boards = await knex('boards').where('favorited', true);
            return res.status(200).json(formatDate(boards));
        }
        const boards = await knex('boards');
        return res.status(200).json(formatDate(boards));
    } catch (error) {
        return handleErrors(res, error);
    }
};


export { listBoards };

