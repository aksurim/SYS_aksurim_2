/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
    }

    try {
      const token = await AuthService.login(email, password);
      res.status(200).json({ token });
    } catch (error: any) {
      // Erros lançados pelo AuthService (ex: "Usuário ou senha inválidos") terão status 401 (Não Autorizado)
      res.status(401).json({ message: error.message });
    }
  }
}

export default new AuthController();
