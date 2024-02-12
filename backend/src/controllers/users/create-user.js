import bcrypt from 'bcrypt';

import { connection as knex } from '../../database/connection.js';

const createUser = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const verifyEmail = await knex('users').select('email').where({email});

        console.log('VERIFICAÇÃO DO EMAIL', verifyEmail);

        if (verifyEmail.length <= 0) {
            const encryptedPassword = await bcrypt.hash(password, 10);

            const create = await knex('users').insert(
                {
                    name,
                    email,
                    password: encryptedPassword
                }
            ).returning(
                [
                    'id',
                    'name',
                    'email'
                ]
            );

            return res.status(201).json(create);
        }

        return res.status(400).json({message: 'This email address is already registered.'});

    } catch (error) {
        console.log('Error Message:', error.message);

        return res.status(500).json({message: 'internal server error'});

    }
};

export {createUser};
