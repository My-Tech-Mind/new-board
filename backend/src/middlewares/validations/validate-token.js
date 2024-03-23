import jwt from 'jsonwebtoken';
import { connection as knex } from '../../database/connection.js';

const passwording = process.env.PASSWORD_HASH;

const validateLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const token = authorization.replace('Bearer ', '');

        const { id } = jwt.verify(token, passwording);

        if (!id) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        const userFound = await knex('users').where({ id }).first();

        if (!userFound) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { password, ...user } = userFound;
        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

export { validateLogin };
