/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import CustomerController from '../controllers/customer.controller';

const customerRouter = Router();

// Todas as rotas de clientes devem ser protegidas e só podem ser acessadas por usuários autenticados.
customerRouter.use(authMiddleware);

// Rotas do CRUD de Clientes
customerRouter.post('/', CustomerController.create);
customerRouter.get('/', CustomerController.getAll);
customerRouter.get('/:id', CustomerController.getById);
customerRouter.put('/:id', CustomerController.update);
customerRouter.delete('/:id', CustomerController.delete);

export default customerRouter;
