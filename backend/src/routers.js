import express from 'express';
import { updateUser } from './controllers/users/update-user.js';
import { deleteUser } from './controllers/users/delete-user.js';
import { createBoard } from './controllers/boards/create-board.js';
import { schemaUser } from './middlewares/joi/joi-schemas/schema-users.js';
import { createUser } from './controllers/users/create-user.js';
import { schemaLogin } from './middlewares/joi/joi-schemas/schema-login.js';
import { loginUser } from './controllers/users/login-user.js'
import { validateLogin } from './middlewares/validations/validate-token.js'
import { editBoard } from './controllers/boards/edit-board.js';
import { listBoards } from './controllers/boards/list-boards.js';
import { validationBodyRequest } from './middlewares/joi/joi-validations/validate-body-request.js';
import { validationParamsRequest } from './middlewares/joi/joi-validations/validate-params-request.js';
import { validationQueryRequest } from './middlewares/joi/joi-validations/validate-query-request.js';
import { paramsSchema, querySchema } from './middlewares/joi/joi-schemas/parameters-schema.js';
import { userDetails } from './controllers/users/user-details.js'
import { schemaBoard } from './middlewares/joi/joi-schemas/schema-boards.js'

const router = express.Router();

router.get('/', async (req, res) => {
	return res.status(200).json({ status: "Ok" });
});

router.post('/user', validationBodyRequest(schemaUser), createUser);

router.post('/login', validationBodyRequest(schemaLogin), loginUser)

router.use(validateLogin)

router.get('/user', userDetails)

router.put('/user', validationBodyRequest(schemaUser), updateUser);
router.delete('/user', deleteUser);
router.post('/board', validationBodyRequest(schemaBoard), createBoard);
router.put('/board/:id', validationParamsRequest(paramsSchema), validationBodyRequest(schemaBoard), editBoard);
router.get('/board', validationQueryRequest(querySchema), listBoards);

export { router };
