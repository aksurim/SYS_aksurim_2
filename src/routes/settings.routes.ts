/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import SettingsController from '../controllers/settings.controller';

const settingsRouter = Router();

settingsRouter.use(authMiddleware);

settingsRouter.get('/', SettingsController.get);
settingsRouter.put('/', SettingsController.createOrUpdate);

export default settingsRouter;
