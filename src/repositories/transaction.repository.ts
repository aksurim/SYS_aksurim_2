/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import pool from '../database/mysql';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface TransactionFromDB extends RowDataPacket {
  id: number;
  tenant_id: number;
  account_id: number;
  category_id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
}

export interface TransactionData {
  account_id: number;
  category_id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
}

class TransactionRepository {
  async create(tenant_id: number, transactionData: TransactionData): Promise<number> {
    const { account_id, category_id, description, amount, type, date } = transactionData;
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO transactions (tenant_id, account_id, category_id, description, amount, type, date) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [tenant_id, account_id, category_id, description, amount, type, date]
    );
    return result.insertId;
  }

  async findAllByTenant(tenant_id: number): Promise<TransactionFromDB[]> {
    const [rows] = await pool.execute<TransactionFromDB[]>(
      'SELECT * FROM transactions WHERE tenant_id = ?',
      [tenant_id]
    );
    return rows;
  }

  async findById(tenant_id: number, id: number): Promise<TransactionFromDB | null> {
    const [rows] = await pool.execute<TransactionFromDB[]>(
      'SELECT * FROM transactions WHERE id = ? AND tenant_id = ?',
      [id, tenant_id]
    );
    return rows[0] || null;
  }

  async update(tenant_id: number, id: number, transactionData: Partial<TransactionData>): Promise<boolean> {
    const fields = Object.keys(transactionData);
    const values = Object.values(transactionData);
    
    if (fields.length === 0) {
      return false;
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    
    const [result] = await pool.execute<ResultSetHeader>(
      `UPDATE transactions SET ${setClause} WHERE id = ? AND tenant_id = ?`,
      [...values, id, tenant_id]
    );
    return result.affectedRows > 0;
  }

  async delete(tenant_id: number, id: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM transactions WHERE id = ? AND tenant_id = ?',
      [id, tenant_id]
    );
    return result.affectedRows > 0;
  }
}

export default new TransactionRepository();
