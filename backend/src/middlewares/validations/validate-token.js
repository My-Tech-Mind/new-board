import {passwording} from './password-hash.js'
import  jwt  from 'jsonwebtoken'
import { connection as knex } from '../../database/connection.js'


const validateLogin = async (req, res, next) => {
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({message: 'Unauthorized'});
    }

    try {

        const token = authorization.replace('Bearer', '').trim();

        const { id } = jwt.verify(token, passwording);

        const userFound = await knex('user').where({id}).first();

        if(!userFound){
            return res.status(404).json({message: 'User not found'});
        }

        const {senha, ...user} = userFound;
        req.user = user;


        next();


    } catch (error) {
        console.log('Message error:', error.message);
        res.status(500).json({message: 'Internal server error'});
    }
}

export {validateLogin};