/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const authRouter = Router();

authRouter.post('/login', AuthController.login);

// Rota de teste para verificar o middleware de autenticação
// Apenas usuários com um token JWT válido podem acessar esta rota.
authRouter.get('/me', authMiddleware, (req, res) => {
  // As informações do usuário estão disponíveis em req.user graças ao middleware
  const userInfo = req.user;
  res.status(200).json({
    message: 'Token válido. Informações do usuário recuperadas com sucesso.',
    user: userInfo
  });
});

export default authRouter;
