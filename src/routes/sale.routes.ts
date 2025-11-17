/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import SaleController from '../controllers/sale.controller';

const saleRouter = Router();

saleRouter.use(authMiddleware);

saleRouter.post('/', SaleController.create);
saleRouter.get('/', SaleController.getAll);
saleRouter.get('/:id', SaleController.getById);

export default saleRouter;
