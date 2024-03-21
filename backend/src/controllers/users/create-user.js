import bcrypt from 'bcrypt';

import { connection as knex } from '../../database/connection.js';

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const verifyEmail = await knex('users').select('email').where({ email });

        if (verifyEmail.length > 0) {
            return res.status(400).json({ message: 'This email address is already registered.' });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const creatingUser = await knex('users').insert(
            {
                name,
                email,
                password: encryptedPassword
            }
        ).returning(['id', 'name', 'email']);

        return res.status(201).json(creatingUser[0]);

    } catch (error) {
        return res.status(500).json({ message: 'internal server error' });
    }
};

export { createUser };
