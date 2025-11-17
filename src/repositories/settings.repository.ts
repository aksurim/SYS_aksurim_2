/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import pool from '../database/mysql';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface SettingsFromDB extends RowDataPacket {
  id: number;
  tenant_id: number;
  company_name: string | null;
  logo_url: string | null;
  instagram: string | null;
  contact: string | null;
}

export interface SettingsData {
  company_name?: string;
  logo_url?: string;
  instagram?: string;
  contact?: string;
}

class SettingsRepository {
  async findByTenant(tenant_id: number): Promise<SettingsFromDB | null> {
    const [rows] = await pool.execute<SettingsFromDB[]>(
      'SELECT * FROM settings WHERE tenant_id = ?',
      [tenant_id]
    );
    return rows[0] || null;
  }

  async create(tenant_id: number, settingsData: SettingsData): Promise<number> {
    const { company_name, logo_url, instagram, contact } = settingsData;
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO settings (tenant_id, company_name, logo_url, instagram, contact) VALUES (?, ?, ?, ?, ?)',
      [tenant_id, company_name || null, logo_url || null, instagram || null, contact || null]
    );
    return result.insertId;
  }

  async update(tenant_id: number, settingsData: Partial<SettingsData>): Promise<boolean> {
    const fields = Object.keys(settingsData);
    const values = Object.values(settingsData);
    
    if (fields.length === 0) {
      return false;
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    
    const [result] = await pool.execute<ResultSetHeader>(
      `UPDATE settings SET ${setClause} WHERE tenant_id = ?`,
      [...values, tenant_id]
    );
    return result.affectedRows > 0;
  }
}

export default new SettingsRepository();
