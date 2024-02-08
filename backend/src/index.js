import express from 'express';
import { router } from './routers.js';

const app = express();

app.use(express.json());

app.use(router);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});