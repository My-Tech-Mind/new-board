import { connection as knex } from '../../database/connection.js';

const deleteBoard = async (req, res) => {
    const { id } = req.params;

    try {
        const existingBoard = await knex('boards').where('id', id).first();

        if (!existingBoard) {
            return res.status(404).json({ message: 'Board not found' });
        }

        await knex('tasks').where('card_id', knex('cards').select('id').where('board_id', id)).delete();
        await knex('cards').where('board_id', id).delete();
        await knex('boards').where('id', id).delete();

        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({message: 'Internal Server error'});
    }
};

export { deleteBoard };
