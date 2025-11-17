/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import { Request, Response } from 'express';
import SupplierService from '../services/supplier.service';

class SupplierController {
  async create(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const newSupplier = await SupplierService.create(tenant_id, req.body);
      res.status(201).json(newSupplier);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const suppliers = await SupplierService.getAll(tenant_id);
      res.status(200).json(suppliers);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const id = parseInt(req.params.id, 10);
      const supplier = await SupplierService.getById(tenant_id, id);
      if (supplier) {
        res.status(200).json(supplier);
      } else {
        res.status(404).json({ message: 'Fornecedor não encontrado.' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const id = parseInt(req.params.id, 10);
      const updatedSupplier = await SupplierService.update(tenant_id, id, req.body);
      if (updatedSupplier) {
        res.status(200).json(updatedSupplier);
      } else {
        res.status(404).json({ message: 'Fornecedor não encontrado para atualização.' });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const id = parseInt(req.params.id, 10);
      await SupplierService.delete(tenant_id, id);
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}

export default new SupplierController();
