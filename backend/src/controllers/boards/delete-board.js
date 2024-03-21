import { connection as knex } from '../../database/connection.js';

const deleteBoard = async (req, res) => {
    const id = req.params.id;

    try {
        const board = await knex('boards').where({ id }).first();
        if (!board) {
            return res.status(404).json({ message: 'Board not found.' });
        }

        await knex('tasks').whereIn('card_id', function () {
            this.select('id').from('cards').where('board_id', id);
        }).delete();
        await knex('cards').where('board_id', id).delete();
        await knex('boards').where('id', id).delete();

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server error' });
    }
};

export { deleteBoard };
