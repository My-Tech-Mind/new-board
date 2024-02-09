import { connection as knex } from '../../database/connection.js';

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
    const deletingUser = await knex('users').where({id}).delete();

    return res.status(204).json();

    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
};

export { deleteUser };