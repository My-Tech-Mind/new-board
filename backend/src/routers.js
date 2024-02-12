import express from 'express';
import { updateUser } from './controllers/users/update-user.js';
import { deleteUser } from './controllers/users/delete-user.js';
import { createBoard } from './controllers/boards/create-board.js';
import { validateBodyCreateUser } from './middlewares/joi/joi-validations/validate-body-create-user.js';

import { createUser } from './controllers/users/create-user.js';

const router = express.Router();

router.get('/', async (req, res) => {
    return res.status(200).json({ status: "Ok" });
});

router.post('/user', validateBodyCreateUser, createUser);

router.put('/user', updateUser);
router.delete('/user/', deleteUser);
router.post('/board', createBoard);

export { router };
