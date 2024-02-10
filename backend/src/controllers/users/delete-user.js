import { connection as knex } from '../../database/connection.js';

const deleteUser = async (req, res) => {
    try {
    const deletingUser = await knex('users').where({id: req.user.id}).delete();

    return res.status(204).json();

    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
};

export { deleteUser };