/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import DashboardKpiController from '../controllers/dashboardKpi.controller';

const dashboardKpiRouter = Router();

dashboardKpiRouter.use(authMiddleware);

dashboardKpiRouter.post('/', DashboardKpiController.create);
dashboardKpiRouter.get('/', DashboardKpiController.getAll);
dashboardKpiRouter.get('/:id', DashboardKpiController.getById);
dashboardKpiRouter.put('/:id', DashboardKpiController.update);
dashboardKpiRouter.delete('/:id', DashboardKpiController.delete);

export default dashboardKpiRouter;
