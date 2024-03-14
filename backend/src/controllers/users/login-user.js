import bcrypt from 'bcrypt';
import { connection as knex } from "../../database/connection.js";
import jwt from 'jsonwebtoken'

import { queryDB } from '../../utils/query.js';
import { handleErrors } from '../../utils/catch-error.js';



const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await queryDB('users', 'select', { email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            return res.status(400).json({ message: 'Email or password do not match.' });
        }

        const token = jwt.sign({ id: user.id }, process.env.PASSWORD_HASH, { expiresIn: '24h' });

        const { id, name, email: userEmail } = user;

        return res.status(200).json({ id, name, email: userEmail, token });

    } catch (error) {
        return handleErrors(res, error);
    }
};


export { loginUser }