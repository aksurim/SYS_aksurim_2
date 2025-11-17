/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import pool from '../database/mysql';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface AuditLogFromDB extends RowDataPacket {
  id: number;
  tenant_id: number;
  user_id: number | null;
  action: string;
  entity_type: string | null;
  entity_id: number | null;
  old_value: string | null; // JSON string
  new_value: string | null; // JSON string
  ip_address: string | null;
  user_agent: string | null;
  timestamp: string;
}

export interface AuditLogData {
  user_id?: number;
  action: string;
  entity_type?: string;
  entity_id?: number;
  old_value?: any;
  new_value?: any;
  ip_address?: string;
  user_agent?: string;
}

class AuditLogRepository {
  async create(tenant_id: number, auditLogData: AuditLogData): Promise<number> {
    const { user_id, action, entity_type, entity_id, old_value, new_value, ip_address, user_agent } = auditLogData;
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO audit_logs (tenant_id, user_id, action, entity_type, entity_id, old_value, new_value, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        tenant_id,
        user_id || null,
        action,
        entity_type || null,
        entity_id || null,
        old_value ? JSON.stringify(old_value) : null,
        new_value ? JSON.stringify(new_value) : null,
        ip_address || null,
        user_agent || null,
      ]
    );
    return result.insertId;
  }

  async findAllByTenant(tenant_id: number): Promise<AuditLogFromDB[]> {
    const [rows] = await pool.execute<AuditLogFromDB[]>(
      'SELECT * FROM audit_logs WHERE tenant_id = ? ORDER BY timestamp DESC',
      [tenant_id]
    );
    return rows;
  }

  async findById(tenant_id: number, id: number): Promise<AuditLogFromDB | null> {
    const [rows] = await pool.execute<AuditLogFromDB[]>(
      'SELECT * FROM audit_logs WHERE id = ? AND tenant_id = ?',
      [id, tenant_id]
    );
    return rows[0] || null;
  }
}

export default new AuditLogRepository();
