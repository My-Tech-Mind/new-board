import { connection as knex } from '../../database/connection.js';

const deleteUser = async (req, res) => {
    try {
        
        await knex('tasks')
            .whereIn('card_id', function() {
                this.select('id').from('cards').whereIn('board_id', function() {
                    this.select('id').from('boards').where('user_id', req.user.id);
                });
            })
            .del();

    
        await knex('cards')
            .whereIn('board_id', function() {
                this.select('id').from('boards').where('user_id', req.user.id);
            })
            .del();

        
        await knex('boards')
            .where('user_id', req.user.id)
            .del();

        
        await knex('users')
            .where('id', req.user.id)
            .del();

        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
};

export { deleteUser };