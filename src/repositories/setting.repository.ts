/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import pool from '../database/mysql';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface SettingFromDB extends RowDataPacket {
  id: number;
  tenant_id: number;
  company_name: string | null;
  logo_url: string | null;
  instagram: string | null;
  contact: string | null;
}

export interface SettingData {
  company_name?: string;
  logo_url?: string;
  instagram?: string;
  contact?: string;
}

class SettingRepository {
  async findByTenant(tenant_id: number): Promise<SettingFromDB | null> {
    const [rows] = await pool.execute<SettingFromDB[]>(
      'SELECT * FROM settings WHERE tenant_id = ?',
      [tenant_id]
    );
    return rows[0] || null;
  }

  async upsert(tenant_id: number, settingData: SettingData): Promise<boolean> {
    const { company_name, logo_url, instagram, contact } = settingData;
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO settings (tenant_id, company_name, logo_url, instagram, contact)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         company_name = VALUES(company_name),
         logo_url = VALUES(logo_url),
         instagram = VALUES(instagram),
         contact = VALUES(contact)`,
      [tenant_id, company_name, logo_url, instagram, contact]
    );
    return result.affectedRows > 0;
  }
}

export default new SettingRepository();
