import { passwording } from './password-hash.js';
import jwt from 'jsonwebtoken';
import { connection as knex } from '../../database/connection.js';

const validateLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    
    if (!authorization) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    try {
        const token = authorization.replace('Bearer ', ''); 

        
        const decodedToken = jwt.verify(token, passwording); 

        
        const { id } = decodedToken;

        const userFound = await knex('users').where({ id }).first();

        if (!userFound) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { senha, ...user } = userFound;
        req.user = user;

        next();
    } catch (error) {

        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid token' });

        } else if (error instanceof jwt.TokenExpiredError) {
        
            return res.status(401).json({ message: 'Expired token' });
        } else {
            console.log('Message error:', error.message);
            console.log('ENTROU AQUI');
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export { validateLogin };
