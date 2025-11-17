/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import CategoryController from '../controllers/category.controller';

const categoryRouter = Router();

categoryRouter.use(authMiddleware);

categoryRouter.post('/', CategoryController.create);
categoryRouter.get('/', CategoryController.getAll);
categoryRouter.get('/:id', CategoryController.getById);
categoryRouter.put('/:id', CategoryController.update);
categoryRouter.delete('/:id', CategoryController.delete);

export default categoryRouter;
