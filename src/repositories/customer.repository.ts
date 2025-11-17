/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import pool from '../database/mysql';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// Interface para os dados do cliente que vêm do BD
export interface CustomerFromDB extends RowDataPacket {
  id: number;
  tenant_id: number;
  name: string;
  document: string | null;
  email: string | null;
  phone: string | null;
  birth_date: string | null; // O tipo Date do SQL vem como string
  address: string | null;
}

// Interface para os dados que serão inseridos/atualizados
export interface CustomerData {
  name: string;
  document?: string;
  email?: string;
  phone?: string;
  birth_date?: string | null;
  address?: string;
}

class CustomerRepository {
  async create(tenant_id: number, customerData: CustomerData): Promise<number> {
    const { name, document, email, phone, birth_date, address } = customerData;
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO customers (tenant_id, name, document, email, phone, birth_date, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [tenant_id, name, document || null, email || null, phone || null, birth_date || null, address || null]
    );
    return result.insertId;
  }

  async findAllByTenant(tenant_id: number): Promise<CustomerFromDB[]> {
    const [rows] = await pool.execute<CustomerFromDB[]>(
      'SELECT * FROM customers WHERE tenant_id = ?',
      [tenant_id]
    );
    return rows;
  }

  async findById(tenant_id: number, id: number): Promise<CustomerFromDB | null> {
    const [rows] = await pool.execute<CustomerFromDB[]>(
      'SELECT * FROM customers WHERE id = ? AND tenant_id = ?',
      [id, tenant_id]
    );
    return rows[0] || null;
  }

  async update(tenant_id: number, id: number, customerData: Partial<CustomerData>): Promise<boolean> {
    const fields = Object.keys(customerData);
    const values = Object.values(customerData);
    
    if (fields.length === 0) {
      return false;
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    
    const [result] = await pool.execute<ResultSetHeader>(
      `UPDATE customers SET ${setClause} WHERE id = ? AND tenant_id = ?`,
      [...values, id, tenant_id]
    );
    return result.affectedRows > 0;
  }

  async delete(tenant_id: number, id: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM customers WHERE id = ? AND tenant_id = ?',
      [id, tenant_id]
    );
    return result.affectedRows > 0;
  }
}

export default new CustomerRepository();
