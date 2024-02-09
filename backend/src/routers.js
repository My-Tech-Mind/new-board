import express from 'express';
import { updateUser } from './controllers/users/update-user.js';

const router = express.Router(); 

router.get('/', async (req, res)=>{
	return res.status(200).json({status: "Ok"});
});

router.put('/user', updateUser);

export { router };