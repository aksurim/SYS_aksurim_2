/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import AccountController from '../controllers/account.controller';

const accountRouter = Router();

accountRouter.use(authMiddleware);

accountRouter.post('/', AccountController.create);
accountRouter.get('/', AccountController.getAll);
accountRouter.get('/:id', AccountController.getById);
accountRouter.put('/:id', AccountController.update);
accountRouter.delete('/:id', AccountController.delete);

export default accountRouter;
