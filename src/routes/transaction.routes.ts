/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import TransactionController from '../controllers/transaction.controller';

const transactionRouter = Router();

transactionRouter.use(authMiddleware);

transactionRouter.post('/', TransactionController.create);
transactionRouter.get('/', TransactionController.getAll);
transactionRouter.get('/:id', TransactionController.getById);
transactionRouter.put('/:id', TransactionController.update);
transactionRouter.delete('/:id', TransactionController.delete);

export default transactionRouter;
