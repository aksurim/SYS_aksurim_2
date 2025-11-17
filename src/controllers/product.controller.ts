/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import { Request, Response } from 'express';
import ProductService from '../services/product.service';

class ProductController {
  async create(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const newProduct = await ProductService.create(tenant_id, req.body);
      res.status(201).json(newProduct);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const products = await ProductService.getAll(tenant_id);
      res.status(200).json(products);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const id = parseInt(req.params.id, 10);
      const product = await ProductService.getById(tenant_id, id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: 'Produto não encontrado.' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const id = parseInt(req.params.id, 10);
      const updatedProduct = await ProductService.update(tenant_id, id, req.body);
      if (updatedProduct) {
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ message: 'Produto não encontrado para atualização.' });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const id = parseInt(req.params.id, 10);
      await ProductService.delete(tenant_id, id);
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}

export default new ProductController();
