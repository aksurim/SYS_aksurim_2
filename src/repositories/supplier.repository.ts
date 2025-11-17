/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import pool from '../database/mysql';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// Interface para os dados do fornecedor que vêm do BD
export interface SupplierFromDB extends RowDataPacket {
  id: number;
  tenant_id: number;
  name: string;
  document: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
}

// Interface para os dados que serão inseridos/atualizados
export interface SupplierData {
  name: string;
  document?: string;
  email?: string;
  phone?: string;
  address?: string;
}

class SupplierRepository {
  async create(tenant_id: number, supplierData: SupplierData): Promise<number> {
    const { name, document, email, phone, address } = supplierData;
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO suppliers (tenant_id, name, document, email, phone, address) VALUES (?, ?, ?, ?, ?, ?)',
      [tenant_id, name, document || null, email || null, phone || null, address || null]
    );
    return result.insertId;
  }

  async findAllByTenant(tenant_id: number): Promise<SupplierFromDB[]> {
    const [rows] = await pool.execute<SupplierFromDB[]>(
      'SELECT * FROM suppliers WHERE tenant_id = ?',
      [tenant_id]
    );
    return rows;
  }

  async findById(tenant_id: number, id: number): Promise<SupplierFromDB | null> {
    const [rows] = await pool.execute<SupplierFromDB[]>(
      'SELECT * FROM suppliers WHERE id = ? AND tenant_id = ?',
      [id, tenant_id]
    );
    return rows[0] || null;
  }

  async update(tenant_id: number, id: number, supplierData: Partial<SupplierData>): Promise<boolean> {
    const fields = Object.keys(supplierData);
    const values = Object.values(supplierData);
    
    if (fields.length === 0) {
      return false;
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    
    const [result] = await pool.execute<ResultSetHeader>(
      `UPDATE suppliers SET ${setClause} WHERE id = ? AND tenant_id = ?`,
      [...values, id, tenant_id]
    );
    return result.affectedRows > 0;
  }

  async delete(tenant_id: number, id: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM suppliers WHERE id = ? AND tenant_id = ?',
      [id, tenant_id]
    );
    return result.affectedRows > 0;
  }
}

export default new SupplierRepository();
