/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import pool from '../database/mysql';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface AccountFromDB extends RowDataPacket {
  id: number;
  tenant_id: number;
  name: string;
  balance: number;
}

export interface AccountData {
  name: string;
  balance?: number;
}

class AccountRepository {
  async create(tenant_id: number, accountData: AccountData): Promise<number> {
    const { name, balance } = accountData;
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO accounts (tenant_id, name, balance) VALUES (?, ?, ?)',
      [tenant_id, name, balance || 0]
    );
    return result.insertId;
  }

  async findAllByTenant(tenant_id: number): Promise<AccountFromDB[]> {
    const [rows] = await pool.execute<AccountFromDB[]>(
      'SELECT * FROM accounts WHERE tenant_id = ?',
      [tenant_id]
    );
    return rows;
  }

  async findById(tenant_id: number, id: number): Promise<AccountFromDB | null> {
    const [rows] = await pool.execute<AccountFromDB[]>(
      'SELECT * FROM accounts WHERE id = ? AND tenant_id = ?',
      [id, tenant_id]
    );
    return rows[0] || null;
  }

  async update(tenant_id: number, id: number, accountData: Partial<AccountData>): Promise<boolean> {
    const fields = Object.keys(accountData);
    const values = Object.values(accountData);
    
    if (fields.length === 0) {
      return false;
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    
    const [result] = await pool.execute<ResultSetHeader>(
      `UPDATE accounts SET ${setClause} WHERE id = ? AND tenant_id = ?`,
      [...values, id, tenant_id]
    );
    return result.affectedRows > 0;
  }

  async delete(tenant_id: number, id: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM accounts WHERE id = ? AND tenant_id = ?',
      [id, tenant_id]
    );
    return result.affectedRows > 0;
  }
}

export default new AccountRepository();
