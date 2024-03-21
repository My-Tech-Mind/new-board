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
import { userDetails } from './controllers/users/user-details.js';
import { schemaBoard } from './middlewares/joi/joi-schemas/schema-boards.js';
import { cardSchema } from './middlewares/joi/joi-schemas/cards-schema.js';
import { taskSchema } from './middlewares/joi/joi-schemas/tasks-schema.js';
import { createTask } from './controllers/tasks/create-task.js';
import { editTask } from './controllers/tasks/edit-task.js';
import { deleteTask } from './controllers/tasks/delete-task.js';
import { editCard } from './controllers/cards/edit-card.js';
import { deleteCard } from './controllers/cards/delete-card.js';
import { detailTask } from './controllers/tasks/detail-task.js';
import { detailBoard } from './controllers/boards/detail-board.js';
import { createCard } from './controllers/cards/create-card.js';
import { deleteBoard } from './controllers/boards/delete-board.js';
import { createCardSchema } from './middlewares/joi/joi-schemas/card-create-schema.js';
import { taskCreationSchema } from './middlewares/joi/joi-schemas/task-creation-schema.js';

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
router.put('/card/:id', validationParamsRequest(paramsSchema), validationBodyRequest(cardSchema), editCard);
router.delete('/card/:id', validationParamsRequest(paramsSchema), deleteCard);
router.post('/task', validationBodyRequest(taskCreationSchema), createTask);
router.put('/task/:id', validationParamsRequest(paramsSchema), validationBodyRequest(taskSchema), editTask);

router.delete('/task/:id', validationParamsRequest(paramsSchema), deleteTask);

router.get('/task/:id', validationParamsRequest(paramsSchema), detailTask);

router.post('/card', validationBodyRequest(createCardSchema), createCard)

router.get('/board/:id', validationParamsRequest(paramsSchema), detailBoard)

router.delete('/board/:id', validationParamsRequest(paramsSchema), deleteBoard)



export { router };
