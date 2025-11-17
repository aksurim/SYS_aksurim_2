/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import CustomerRepository, { CustomerData, CustomerFromDB } from '../repositories/customer.repository';

class CustomerService {
  async create(tenant_id: number, customerData: CustomerData): Promise<CustomerFromDB> {
    if (!customerData.name) {
      throw new Error('O nome do cliente é obrigatório.');
    }
    const newCustomerId = await CustomerRepository.create(tenant_id, customerData);
    const newCustomer = await CustomerRepository.findById(tenant_id, newCustomerId);
    if (!newCustomer) {
      throw new Error('Falha ao criar e recuperar o cliente.');
    }
    return newCustomer;
  }

  async getAll(tenant_id: number): Promise<CustomerFromDB[]> {
    return CustomerRepository.findAllByTenant(tenant_id);
  }

  async getById(tenant_id: number, id: number): Promise<CustomerFromDB | null> {
    return CustomerRepository.findById(tenant_id, id);
  }

  async update(tenant_id: number, id: number, customerData: Partial<CustomerData>): Promise<CustomerFromDB | null> {
    const success = await CustomerRepository.update(tenant_id, id, customerData);
    if (!success) {
      // Pode ser que o cliente não exista ou não pertença ao tenant
      const existingCustomer = await CustomerRepository.findById(tenant_id, id);
      if (!existingCustomer) {
        throw new Error('Cliente não encontrado ou não pertence à sua empresa.');
      }
    }
    return CustomerRepository.findById(tenant_id, id);
  }

  async delete(tenant_id: number, id: number): Promise<void> {
    const success = await CustomerRepository.delete(tenant_id, id);
    if (!success) {
      throw new Error('Cliente não encontrado ou não pertence à sua empresa.');
    }
  }
}

export default new CustomerService();
