/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import pool from '../database/mysql';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface CategoryFromDB extends RowDataPacket {
  id: number;
  tenant_id: number;
  name: string;
  type: 'income' | 'expense';
}

export interface CategoryData {
  name: string;
  type: 'income' | 'expense';
}

class CategoryRepository {
  async create(tenant_id: number, categoryData: CategoryData): Promise<number> {
    const { name, type } = categoryData;
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO categories (tenant_id, name, type) VALUES (?, ?, ?)',
      [tenant_id, name, type]
    );
    return result.insertId;
  }

  async findAllByTenant(tenant_id: number): Promise<CategoryFromDB[]> {
    const [rows] = await pool.execute<CategoryFromDB[]>(
      'SELECT * FROM categories WHERE tenant_id = ?',
      [tenant_id]
    );
    return rows;
  }

  async findById(tenant_id: number, id: number): Promise<CategoryFromDB | null> {
    const [rows] = await pool.execute<CategoryFromDB[]>(
      'SELECT * FROM categories WHERE id = ? AND tenant_id = ?',
      [id, tenant_id]
    );
    return rows[0] || null;
  }

  async update(tenant_id: number, id: number, categoryData: Partial<CategoryData>): Promise<boolean> {
    const fields = Object.keys(categoryData);
    const values = Object.values(categoryData);
    
    if (fields.length === 0) {
      return false;
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    
    const [result] = await pool.execute<ResultSetHeader>(
      `UPDATE categories SET ${setClause} WHERE id = ? AND tenant_id = ?`,
      [...values, id, tenant_id]
    );
    return result.affectedRows > 0;
  }

  async delete(tenant_id: number, id: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM categories WHERE id = ? AND tenant_id = ?',
      [id, tenant_id]
    );
    return result.affectedRows > 0;
  }
}

export default new CategoryRepository();
