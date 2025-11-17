/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import pool from '../database/mysql';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface SaleFromDB extends RowDataPacket {
  id: number;
  tenant_id: number;
  customer_id: number | null;
  user_id: number;
  total: number;
  discount: number | null;
  shipping_cost: number | null;
}

export interface SaleData {
  customer_id?: number;
  user_id: number;
  total: number;
  discount?: number;
  shipping_cost?: number;
  items: SaleItemData[];
}

export interface SaleItemData {
  product_id: number;
  quantity: number;
  price: number;
}

class SaleRepository {
  async create(tenant_id: number, saleData: SaleData): Promise<number> {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      const { customer_id, user_id, total, discount, shipping_cost, items } = saleData;
      
      const [saleResult] = await connection.execute<ResultSetHeader>(
        'INSERT INTO sales (tenant_id, customer_id, user_id, total, discount, shipping_cost) VALUES (?, ?, ?, ?, ?, ?)',
        [tenant_id, customer_id || null, user_id, total, discount || null, shipping_cost || null]
      );
      const saleId = saleResult.insertId;

      const saleItemsQueries = items.map(item => {
        return connection.execute(
          'INSERT INTO sale_items (tenant_id, sale_id, product_id, quantity, price) VALUES (?, ?, ?, ?, ?)',
          [tenant_id, saleId, item.product_id, item.quantity, item.price]
        );
      });

      await Promise.all(saleItemsQueries);

      await connection.commit();
      connection.release();
      return saleId;
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  }

  async findAllByTenant(tenant_id: number): Promise<SaleFromDB[]> {
    const [rows] = await pool.execute<SaleFromDB[]>(
      'SELECT * FROM sales WHERE tenant_id = ?',
      [tenant_id]
    );
    return rows;
  }

  async findById(tenant_id: number, id: number): Promise<SaleFromDB | null> {
    const [rows] = await pool.execute<SaleFromDB[]>(
      'SELECT * FROM sales WHERE id = ? AND tenant_id = ?',
      [id, tenant_id]
    );
    return rows[0] || null;
  }
}

export default new SaleRepository();
