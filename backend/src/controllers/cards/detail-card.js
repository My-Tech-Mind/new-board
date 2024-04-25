import { connection as knex } from '../../database/connection.js';

const detailCard = async (req, res) => {
    const id = req.params.id;

    try {
        const card = await knex('cards').where({ id }).first();
        if (!card) {
            return res.status(404).json({ message: 'Card not found.' });
        }

        const cardAndBoardOwner = await knex('cards')
            .join('boards', 'boards.id', '=', 'cards.board_id')
            .select('user_id as boardOwner')
            .where('cards.id', id)
            .first();

        if (cardAndBoardOwner.boardOwner != req.user.id) {
            return res.status(403).json({ message: 'Denied access.' });
        }

        const tasks = await knex('tasks').where({ card_id: id }).orderBy('ordenation', 'asc');
        card.tasks = tasks;

        return res.status(200).json(card);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export { detailCard };