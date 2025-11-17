/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import SupplierRepository, { SupplierData, SupplierFromDB } from '../repositories/supplier.repository';

class SupplierService {
  async create(tenant_id: number, supplierData: SupplierData): Promise<SupplierFromDB> {
    if (!supplierData.name) {
      throw new Error('O nome do fornecedor é obrigatório.');
    }
    const newSupplierId = await SupplierRepository.create(tenant_id, supplierData);
    const newSupplier = await SupplierRepository.findById(tenant_id, newSupplierId);
    if (!newSupplier) {
      throw new Error('Falha ao criar e recuperar o fornecedor.');
    }
    return newSupplier;
  }

  async getAll(tenant_id: number): Promise<SupplierFromDB[]> {
    return SupplierRepository.findAllByTenant(tenant_id);
  }

  async getById(tenant_id: number, id: number): Promise<SupplierFromDB | null> {
    return SupplierRepository.findById(tenant_id, id);
  }

  async update(tenant_id: number, id: number, supplierData: Partial<SupplierData>): Promise<SupplierFromDB | null> {
    const success = await SupplierRepository.update(tenant_id, id, supplierData);
    if (!success) {
      const existingSupplier = await SupplierRepository.findById(tenant_id, id);
      if (!existingSupplier) {
        throw new Error('Fornecedor não encontrado ou não pertence à sua empresa.');
      }
    }
    return SupplierRepository.findById(tenant_id, id);
  }

  async delete(tenant_id: number, id: number): Promise<void> {
    const success = await SupplierRepository.delete(tenant_id, id);
    if (!success) {
      throw new Error('Fornecedor não encontrado ou não pertence à sua empresa.');
    }
  }
}

export default new SupplierService();
