/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import pool from '../database/mysql';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface ProductFromDB extends RowDataPacket {
  id: number;
  tenant_id: number;
  name: string;
  description: string | null;
  price: number;
  cost: number | null;
  product_type: 'FinishedGood' | 'RawMaterial' | 'Service';
  is_reverse_logistics: boolean;
}

export interface ProductData {
  name: string;
  description?: string;
  price: number;
  cost?: number;
  product_type: 'FinishedGood' | 'RawMaterial' | 'Service';
  is_reverse_logistics?: boolean;
}

class ProductRepository {
  async create(tenant_id: number, productData: ProductData): Promise<number> {
    const { name, description, price, cost, product_type, is_reverse_logistics } = productData;
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO products (tenant_id, name, description, price, cost, product_type, is_reverse_logistics) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [tenant_id, name, description || null, price, cost || null, product_type, is_reverse_logistics || false]
    );
    return result.insertId;
  }

  async findAllByTenant(tenant_id: number): Promise<ProductFromDB[]> {
    const [rows] = await pool.execute<ProductFromDB[]>(
      'SELECT * FROM products WHERE tenant_id = ?',
      [tenant_id]
    );
    return rows;
  }

  async findById(tenant_id: number, id: number): Promise<ProductFromDB | null> {
    const [rows] = await pool.execute<ProductFromDB[]>(
      'SELECT * FROM products WHERE id = ? AND tenant_id = ?',
      [id, tenant_id]
    );
    return rows[0] || null;
  }

  async update(tenant_id: number, id: number, productData: Partial<ProductData>): Promise<boolean> {
    const fields = Object.keys(productData);
    const values = Object.values(productData);
    
    if (fields.length === 0) {
      return false;
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    
    const [result] = await pool.execute<ResultSetHeader>(
      `UPDATE products SET ${setClause} WHERE id = ? AND tenant_id = ?`,
      [...values, id, tenant_id]
    );
    return result.affectedRows > 0;
  }

  async delete(tenant_id: number, id: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM products WHERE id = ? AND tenant_id = ?',
      [id, tenant_id]
    );
    return result.affectedRows > 0;
  }
}

export default new ProductRepository();
