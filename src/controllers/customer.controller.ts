/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import { Request, Response } from 'express';
import CustomerService from '../services/customer.service';

class CustomerController {
  async create(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id; // Obtido do authMiddleware
      const newCustomer = await CustomerService.create(tenant_id, req.body);
      res.status(201).json(newCustomer);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const customers = await CustomerService.getAll(tenant_id);
      res.status(200).json(customers);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const id = parseInt(req.params.id, 10);
      const customer = await CustomerService.getById(tenant_id, id);
      if (customer) {
        res.status(200).json(customer);
      } else {
        res.status(404).json({ message: 'Cliente não encontrado.' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const id = parseInt(req.params.id, 10);
      const updatedCustomer = await CustomerService.update(tenant_id, id, req.body);
      if (updatedCustomer) {
        res.status(200).json(updatedCustomer);
      } else {
        res.status(404).json({ message: 'Cliente não encontrado para atualização.' });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const id = parseInt(req.params.id, 10);
      await CustomerService.delete(tenant_id, id);
      res.status(204).send(); // 204 No Content
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}

export default new CustomerController();
