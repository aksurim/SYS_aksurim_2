/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import ProductRepository, { ProductData, ProductFromDB } from '../repositories/product.repository';

class ProductService {
  async create(tenant_id: number, productData: ProductData): Promise<ProductFromDB> {
    if (!productData.name) {
      throw new Error('O nome do produto é obrigatório.');
    }
    const newProductId = await ProductRepository.create(tenant_id, productData);
    const newProduct = await ProductRepository.findById(tenant_id, newProductId);
    if (!newProduct) {
      throw new Error('Falha ao criar e recuperar o produto.');
    }
    return newProduct;
  }

  async getAll(tenant_id: number): Promise<ProductFromDB[]> {
    return ProductRepository.findAllByTenant(tenant_id);
  }

  async getById(tenant_id: number, id: number): Promise<ProductFromDB | null> {
    return ProductRepository.findById(tenant_id, id);
  }

  async update(tenant_id: number, id: number, productData: Partial<ProductData>): Promise<ProductFromDB | null> {
    const allowedUpdateData: Partial<ProductData> = {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      cost: productData.cost,
      product_type: productData.product_type,
      is_reverse_logistics: productData.is_reverse_logistics,
    };

    const success = await ProductRepository.update(tenant_id, id, allowedUpdateData);
    if (!success) {
      const existingProduct = await ProductRepository.findById(tenant_id, id);
      if (!existingProduct) {
        throw new Error('Produto não encontrado ou não pertence à sua empresa.');
      }
    }
    return ProductRepository.findById(tenant_id, id);
  }

  async delete(tenant_id: number, id: number): Promise<void> {
    const success = await ProductRepository.delete(tenant_id, id);
    if (!success) {
      throw new Error('Produto não encontrado ou não pertence à sua empresa.');
    }
  }
}

export default new ProductService();
