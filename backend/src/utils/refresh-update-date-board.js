import { connection as knex } from '../database/connection.js';
import format from 'date-fns/format';

const refreshUpdateDateBoard = async (boardId) => {
	const refreshingUpdateDateBoard = await knex('boards').update({
		update_date: format(new Date(), 'yyyy-MM-dd kk:mm:ss')
	}).where({ id: boardId[0].board_id })

	return refreshingUpdateDateBoard;
}

export { refreshUpdateDateBoard };