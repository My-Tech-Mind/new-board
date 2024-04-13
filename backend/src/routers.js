import express from 'express';
import { createUser } from './controllers/users/create-user.js';
import { loginUser } from './controllers/users/login-user.js';
import { updateUser } from './controllers/users/update-user.js';
import { detailUser } from './controllers/users/detail-user.js';
import { deleteUser } from './controllers/users/delete-user.js';
import { createBoard } from './controllers/boards/create-board.js';
import { editBoard } from './controllers/boards/edit-board.js';
import { detailBoard } from './controllers/boards/detail-board.js';
import { listBoards } from './controllers/boards/list-boards.js';
import { deleteBoard } from './controllers/boards/delete-board.js';
import { createCard } from './controllers/cards/create-card.js';
import { editCard } from './controllers/cards/edit-card.js';
import { deleteCard } from './controllers/cards/delete-card.js';
import { createTask } from './controllers/tasks/create-task.js';
import { editTask } from './controllers/tasks/edit-task.js';
import { detailTask } from './controllers/tasks/detail-task.js';
import { deleteTask } from './controllers/tasks/delete-task.js';
import { ordenateCards } from './controllers/cards/ordenate-cards.js';
import { ordenateTasks } from './controllers/tasks/ordenate-tasks.js';
import { validateBodyRequest } from './middlewares/joi/joi-validations/validate-body-request.js';
import { validateParamsRequest } from './middlewares/joi/joi-validations/validate-params-request.js';
import { validateQueryRequest } from './middlewares/joi/joi-validations/validate-query-request.js';
import { paramsSchema, querySchema } from './middlewares/joi/joi-schemas/parameters-schema.js';
import { userSchema } from './middlewares/joi/joi-schemas/user-schema.js';
import { loginSchema } from './middlewares/joi/joi-schemas/login-schema.js';
import { validateLogin } from './middlewares/validations/validate-token.js'
import { boardSchema } from './middlewares/joi/joi-schemas/board-schema.js';
import { ordenateCardsSchema } from './middlewares/joi/joi-schemas/ordenate-cards-schema.js';
import { ordenateTasksSchema } from './middlewares/joi/joi-schemas/ordenate-tasks-schema.js';
import { cardSchema } from './middlewares/joi/joi-schemas/card-schema.js';
import { taskSchema } from './middlewares/joi/joi-schemas/task-schema.js';

const router = express.Router();

router.get('/', async (req, res) => {
	return res.status(200).json({ status: "Ok" });
});

router.post('/user', validateBodyRequest(userSchema), createUser);
router.post('/login', validateBodyRequest(loginSchema), loginUser);

router.use(validateLogin);

router.put('/user', validateBodyRequest(userSchema), updateUser);
router.get('/user', detailUser);
router.delete('/user', deleteUser);
router.post('/board', validateBodyRequest(boardSchema), createBoard);
router.put('/board/:id', validateParamsRequest(paramsSchema), validateBodyRequest(boardSchema), editBoard);
router.get('/board/:id', validateParamsRequest(paramsSchema), detailBoard);
router.get('/board', validateQueryRequest(querySchema), listBoards);
router.delete('/board/:id', validateParamsRequest(paramsSchema), deleteBoard);
router.put('/card/ordenation', validateBodyRequest(ordenateCardsSchema), ordenateCards);
router.put('/task/ordenation', validateBodyRequest(ordenateTasksSchema), ordenateTasks);
router.post('/card', validateBodyRequest(cardSchema), createCard);
router.put('/card/:id', validateParamsRequest(paramsSchema), validateBodyRequest(cardSchema), editCard);
router.delete('/card/:id', validateParamsRequest(paramsSchema), deleteCard);
router.post('/task', validateBodyRequest(taskSchema), createTask);
router.put('/task/:id', validateParamsRequest(paramsSchema), validateBodyRequest(taskSchema), editTask);
router.get('/task/:id', validateParamsRequest(paramsSchema), detailTask);
router.delete('/task/:id', validateParamsRequest(paramsSchema), deleteTask);

export { router };
