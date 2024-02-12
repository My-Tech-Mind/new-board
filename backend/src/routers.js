import express from 'express';
import { updateUser } from './controllers/users/update-user.js';
import { deleteUser } from './controllers/users/delete-user.js';
import { createBoard } from './controllers/boards/create-board.js';
import { listBoards } from './controllers/boards/list-boards.js';
import { validationBodyRequest } from './middlewares/joi/joi-validations/validate-body-request.js';
import { validationParamsRequest } from './middlewares/joi/joi-validations/validate-params-request.js';
import { validationQueryRequest } from './middlewares/joi/joi-validations/validate-query-request.js';
import { paramsSchema, querySchema } from './middlewares/joi/joi-schemas/parameters-schema.js';

const router = express.Router();

router.get('/', async (req, res) => {
	return res.status(200).json({ status: "Ok" });
});

router.put('/user', updateUser);
router.delete('/user/', deleteUser);
router.post('/board', createBoard);
router.get('/board', listBoards)

export { router };