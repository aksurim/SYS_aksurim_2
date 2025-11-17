/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import { Request, Response } from 'express';
import SaleService from '../services/sale.service';

class SaleController {
  async create(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const user_id = req.user.id_usuario;
      const newSale = await SaleService.create(tenant_id, { ...req.body, user_id });
      res.status(201).json(newSale);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const sales = await SaleService.getAll(tenant_id);
      res.status(200).json(sales);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const id = parseInt(req.params.id, 10);
      const sale = await SaleService.getById(tenant_id, id);
      if (sale) {
        res.status(200).json(sale);
      } else {
        res.status(404).json({ message: 'Venda não encontrada.' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new SaleController();
