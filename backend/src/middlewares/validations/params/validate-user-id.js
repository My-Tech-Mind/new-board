import { connection as knex } from '../../../database/connection.js';

const validateUserId = async (req, res, next) => {
    const { id } = req.params;

    try{
    const existingId = await knex('users').select('id').where({id}).first();
    if(!existingId) {
        return res.status(400).json({message: 'User not found.'})
    }

    next();
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
};

export { validateUserId };