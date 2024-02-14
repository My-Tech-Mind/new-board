import express from 'express';
import { updateUser } from './controllers/users/update-user.js';
import { deleteUser } from './controllers/users/delete-user.js';
import { createBoard } from './controllers/boards/create-board.js';

import {bodyCreateUser} from './middlewares/joi/joi-schemas/schema-users.js'
import {validationBodyRequest} from './middlewares/joi/joi-validations/validate-body-request.js'
import { createUser } from './controllers/users/create-user.js';
import { validateBodyLogin } from './middlewares/joi/joi-validations/validate-body-login.js';

const router = express.Router();

router.get('/', async (req, res) => {
    return res.status(200).json({ status: "Ok" });
});

router.post('/user', validationBodyRequest(bodyCreateUser), createUser);
router.post('/login', validateBodyLogin)

router.put('/user', updateUser);
router.delete('/user/', deleteUser);
router.post('/board', createBoard);

export { router };
