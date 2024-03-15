import bcrypt from 'bcrypt';

import { connection as knex } from '../../database/connection.js';

import { queryDB } from '../../utils/query.js';
import { handleErrors } from '../../utils/catch-error.js';

import {checkExistence} from '../../utils/checkExistence.js'


const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const verifyEmail = await checkExistence('users', { email: email });

        console.log(verifyEmail);

        if (verifyEmail) {
            return res.status(400).json({ message: 'This email address is already registered.' });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const creatingUser = await queryDB('users', 'insert', { name, email, password: encryptedPassword });

        const { id, ...userData } = creatingUser[0];

        return res.status(201).json({ id, ...userData });

    } catch (error) {
        return handleErrors(res, error);
    }
};

export {createUser};
