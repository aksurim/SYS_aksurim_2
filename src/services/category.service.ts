/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import CategoryRepository, { CategoryData, CategoryFromDB } from '../repositories/category.repository';

class CategoryService {
  async create(tenant_id: number, categoryData: CategoryData): Promise<CategoryFromDB> {
    if (!categoryData.name) {
      throw new Error('O nome da categoria é obrigatório.');
    }
    const newCategoryId = await CategoryRepository.create(tenant_id, categoryData);
    const newCategory = await CategoryRepository.findById(tenant_id, newCategoryId);
    if (!newCategory) {
      throw new Error('Falha ao criar e recuperar a categoria.');
    }
    return newCategory;
  }

  async getAll(tenant_id: number): Promise<CategoryFromDB[]> {
    return CategoryRepository.findAllByTenant(tenant_id);
  }

  async getById(tenant_id: number, id: number): Promise<CategoryFromDB | null> {
    return CategoryRepository.findById(tenant_id, id);
  }

  async update(tenant_id: number, id: number, categoryData: Partial<CategoryData>): Promise<CategoryFromDB | null> {
    const success = await CategoryRepository.update(tenant_id, id, categoryData);
    if (!success) {
      const existingCategory = await CategoryRepository.findById(tenant_id, id);
      if (!existingCategory) {
        throw new Error('Categoria não encontrada ou não pertence à sua empresa.');
      }
    }
    return CategoryRepository.findById(tenant_id, id);
  }

  async delete(tenant_id: number, id: number): Promise<void> {
    const success = await CategoryRepository.delete(tenant_id, id);
    if (!success) {
      throw new Error('Categoria não encontrada ou não pertence à sua empresa.');
    }
  }
}

export default new CategoryService();
