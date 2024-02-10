import { connection as knex } from '../../database/connection.js';
import bcrypt from 'bcrypt';

const updateUser = async (req, res) => {
    const {name, email, password} = req.body;

    try{
        const emailValidationUpdate = await knex('users').select('email').where({email}).andWhereNot({id: req.user.id}).first();
    if (emailValidationUpdate) {
        return res.status(400).json({message: 'This email is already registered.'});
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const updatingUser = await knex('users').update({
        name,
        email,
        password: encryptedPassword
    }).where({id: req.user.id}).returning(['id', 'name', 'email']);

    return res.status(200).json(updatingUser[0]);
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'})
    }
};

export { updateUser };