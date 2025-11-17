/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import SaleRepository, { SaleData, SaleFromDB } from '../repositories/sale.repository';

class SaleService {
  async create(tenant_id: number, saleData: SaleData): Promise<SaleFromDB> {
    if (!saleData.items || saleData.items.length === 0) {
      throw new Error('A venda deve ter pelo menos um item.');
    }
    const newSaleId = await SaleRepository.create(tenant_id, saleData);
    const newSale = await SaleRepository.findById(tenant_id, newSaleId);
    if (!newSale) {
      throw new Error('Falha ao criar e recuperar a venda.');
    }
    return newSale;
  }

  async getAll(tenant_id: number): Promise<SaleFromDB[]> {
    return SaleRepository.findAllByTenant(tenant_id);
  }

  async getById(tenant_id: number, id: number): Promise<SaleFromDB | null> {
    return SaleRepository.findById(tenant_id, id);
  }
}

export default new SaleService();
