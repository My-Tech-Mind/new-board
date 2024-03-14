import { connection as knex } from '../../database/connection.js';
import bcrypt from 'bcrypt';

import { queryDB } from '../../utils/query.js';
import { handleErrors } from '../../utils/catch-error.js';


const updateUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const emailValidationUpdate = await queryDB('users', 'select', { email });

        if (emailValidationUpdate && emailValidationUpdate.id !== req.user.id) {
            return res.status(400).json({ message: 'This email is already registered.' });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const updatingUser = await queryDB('users', 'update', {
            id: req.user.id,
            name,
            email,
            password: encryptedPassword
        });

        const { id, ...userData } = updatingUser[0];

        return res.status(200).json({ id, ...userData });
    } catch (error) {
        return handleErrors(res, error);
    }
};


export { updateUser };