/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import SupplierController from '../controllers/supplier.controller';

const supplierRouter = Router();

supplierRouter.use(authMiddleware);

supplierRouter.post('/', SupplierController.create);
supplierRouter.get('/', SupplierController.getAll);
supplierRouter.get('/:id', SupplierController.getById);
supplierRouter.put('/:id', SupplierController.update);
supplierRouter.delete('/:id', SupplierController.delete);

export default supplierRouter;
