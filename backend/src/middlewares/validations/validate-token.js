import  jwt  from 'jsonwebtoken'
import { connection as knex } from '../../database/connection.js'


const validateLogin = async (req, res, next) => {
    const {authorization} = req.headers;

    const passwording = process.env.PASSWORD_HASH;

    if(!authorization){
        return res.status(401).json({message: 'Unauthorized'});
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
        console.log('Message error:', error.message);
        res.status(500).json({message: 'Internal server error'});
    }
}

export { validateLogin };
