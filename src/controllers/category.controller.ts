/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import { Request, Response } from 'express';
import CategoryService from '../services/category.service';

class CategoryController {
  async create(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const newCategory = await CategoryService.create(tenant_id, req.body);
      res.status(201).json(newCategory);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const categories = await CategoryService.getAll(tenant_id);
      res.status(200).json(categories);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const id = parseInt(req.params.id, 10);
      const category = await CategoryService.getById(tenant_id, id);
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({ message: 'Categoria não encontrada.' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const id = parseInt(req.params.id, 10);
      const updatedCategory = await CategoryService.update(tenant_id, id, req.body);
      if (updatedCategory) {
        res.status(200).json(updatedCategory);
      } else {
        res.status(404).json({ message: 'Categoria não encontrada para atualização.' });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const id = parseInt(req.params.id, 10);
      await CategoryService.delete(tenant_id, id);
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}

export default new CategoryController();
