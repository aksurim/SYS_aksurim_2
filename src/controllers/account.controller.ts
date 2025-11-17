/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import { Request, Response } from 'express';
import AccountService from '../services/account.service';

class AccountController {
  async create(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const newAccount = await AccountService.create(tenant_id, req.body);
      res.status(201).json(newAccount);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const accounts = await AccountService.getAll(tenant_id);
      res.status(200).json(accounts);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const id = parseInt(req.params.id, 10);
      const account = await AccountService.getById(tenant_id, id);
      if (account) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ message: 'Conta não encontrada.' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const id = parseInt(req.params.id, 10);
      const updatedAccount = await AccountService.update(tenant_id, id, req.body);
      if (updatedAccount) {
        res.status(200).json(updatedAccount);
      } else {
        res.status(404).json({ message: 'Conta não encontrada para atualização.' });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const id = parseInt(req.params.id, 10);
      await AccountService.delete(tenant_id, id);
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}

export default new AccountController();
