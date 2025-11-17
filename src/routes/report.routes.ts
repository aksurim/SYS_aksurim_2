/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import ReportController from '../controllers/report.controller';

const reportRouter = Router();

reportRouter.use(authMiddleware);

reportRouter.post('/', ReportController.create);
reportRouter.get('/', ReportController.getAll);
reportRouter.get('/:id', ReportController.getById);

export default reportRouter;
