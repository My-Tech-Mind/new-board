import express from 'express';
import { updateUser } from './controllers/users/update-user.js';
import { deleteUser } from './controllers/users/delete-user.js'; 
import { createBoard } from './controllers/boards/create-board.js';
import { editBoard } from './controllers/boards/edit-board.js';

const router = express.Router(); 

router.get('/', async (req, res)=>{
	return res.status(200).json({status: "Ok"});
});

router.put('/user', updateUser);
router.delete('/user/', deleteUser);
router.post('/board', createBoard);
router.put('/board/:id', editBoard);

export { router };