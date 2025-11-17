/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import AuditLogController from '../controllers/auditLog.controller';

const auditLogRouter = Router();

auditLogRouter.use(authMiddleware);

auditLogRouter.post('/', AuditLogController.create);
auditLogRouter.get('/', AuditLogController.getAll);
auditLogRouter.get('/:id', AuditLogController.getById);

export default auditLogRouter;
