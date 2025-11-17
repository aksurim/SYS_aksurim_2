/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import ProductController from '../controllers/product.controller';

const productRouter = Router();

productRouter.use(authMiddleware);

productRouter.post('/', ProductController.create);
productRouter.get('/', ProductController.getAll);
productRouter.get('/:id', ProductController.getById);
productRouter.put('/:id', ProductController.update);
productRouter.delete('/:id', ProductController.delete);

export default productRouter;
