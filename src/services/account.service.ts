/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import AccountRepository, { AccountData, AccountFromDB } from '../repositories/account.repository';

class AccountService {
  async create(tenant_id: number, accountData: AccountData): Promise<AccountFromDB> {
    if (!accountData.name) {
      throw new Error('O nome da conta é obrigatório.');
    }
    const newAccountId = await AccountRepository.create(tenant_id, accountData);
    const newAccount = await AccountRepository.findById(tenant_id, newAccountId);
    if (!newAccount) {
      throw new Error('Falha ao criar e recuperar a conta.');
    }
    return newAccount;
  }

  async getAll(tenant_id: number): Promise<AccountFromDB[]> {
    return AccountRepository.findAllByTenant(tenant_id);
  }

  async getById(tenant_id: number, id: number): Promise<AccountFromDB | null> {
    return AccountRepository.findById(tenant_id, id);
  }

  async update(tenant_id: number, id: number, accountData: Partial<AccountData>): Promise<AccountFromDB | null> {
    const success = await AccountRepository.update(tenant_id, id, accountData);
    if (!success) {
      const existingAccount = await AccountRepository.findById(tenant_id, id);
      if (!existingAccount) {
        throw new Error('Conta não encontrada ou não pertence à sua empresa.');
      }
    }
    return AccountRepository.findById(tenant_id, id);
  }

  async delete(tenant_id: number, id: number): Promise<void> {
    const success = await AccountRepository.delete(tenant_id, id);
    if (!success) {
      throw new Error('Conta não encontrada ou não pertence à sua empresa.');
    }
  }
}

export default new AccountService();
