/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import TransactionRepository, { TransactionData, TransactionFromDB } from '../repositories/transaction.repository';

class TransactionService {
  async create(tenant_id: number, transactionData: TransactionData): Promise<TransactionFromDB> {
    if (!transactionData.description) {
      throw new Error('A descrição da transação é obrigatória.');
    }
    const newTransactionId = await TransactionRepository.create(tenant_id, transactionData);
    const newTransaction = await TransactionRepository.findById(tenant_id, newTransactionId);
    if (!newTransaction) {
      throw new Error('Falha ao criar e recuperar a transação.');
    }
    return newTransaction;
  }

  async getAll(tenant_id: number): Promise<TransactionFromDB[]> {
    return TransactionRepository.findAllByTenant(tenant_id);
  }

  async getById(tenant_id: number, id: number): Promise<TransactionFromDB | null> {
    return TransactionRepository.findById(tenant_id, id);
  }

  async update(tenant_id: number, id: number, transactionData: Partial<TransactionData>): Promise<TransactionFromDB | null> {
    const success = await TransactionRepository.update(tenant_id, id, transactionData);
    if (!success) {
      const existingTransaction = await TransactionRepository.findById(tenant_id, id);
      if (!existingTransaction) {
        throw new Error('Transação não encontrada ou não pertence à sua empresa.');
      }
    }
    return TransactionRepository.findById(tenant_id, id);
  }

  async delete(tenant_id: number, id: number): Promise<void> {
    const success = await TransactionRepository.delete(tenant_id, id);
    if (!success) {
      throw new Error('Transação não encontrada ou não pertence à sua empresa.');
    }
  }
}

export default new TransactionService();
