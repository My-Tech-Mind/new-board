import express from 'express';
import { updateUser } from './controllers/users/update-user.js';
import { deleteUser } from './controllers/users/delete-user.js'; 
import { validateUserId } from './middlewares/validations/params/validate-user-id.js';

const router = express.Router(); 

router.get('/', async (req, res)=>{
	return res.status(200).json({status: "Ok"});
});

router.put('/user', updateUser);
router.delete('/user/:id', validateUserId, deleteUser);

export { router };