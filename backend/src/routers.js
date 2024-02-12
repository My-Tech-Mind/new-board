import express from 'express';
import { updateUser } from './controllers/users/update-user.js';
import { deleteUser } from './controllers/users/delete-user.js';
import { createBoard } from './controllers/boards/create-board.js';
import { validateBodyCreateUser } from './middlewares/joi/joi-validations/validate-body-create-user.js';
import { createUser } from './controllers/users/create-user.js';
import { validateBodyLogin } from './middlewares/joi/joi-validations/validate-body-login.js';
import {loginUser} from './controllers/users/login-user.js'
import {validateLogin} from './middlewares/validations/validate-token.js'
import {validateBodyCreateBoard} from './middlewares/joi/joi-validations/validade-body-create-board.js'

const router = express.Router();

router.get('/', async (req, res) => {
    return res.status(200).json({ status: "Ok" });
});

router.post('/user', validateBodyCreateUser, createUser);
router.post('/login', validateBodyLogin, loginUser)

router.use(validateLogin)

router.post('/board', validateBodyCreateBoard)

router.put('/user', updateUser);
router.delete('/user/', deleteUser);
router.post('/board', createBoard);

export { router };
