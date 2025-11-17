/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import pool from '../database/mysql';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface DashboardKpiFromDB extends RowDataPacket {
  id: number;
  tenant_id: number;
  name: string;
  value: string;
}

export interface DashboardKpiData {
  name: string;
  value: string;
}

class DashboardKpiRepository {
  async create(tenant_id: number, dashboardKpiData: DashboardKpiData): Promise<number> {
    const { name, value } = dashboardKpiData;
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO dashboard_kpis (tenant_id, name, value) VALUES (?, ?, ?)',
      [tenant_id, name, value]
    );
    return result.insertId;
  }

  async findAllByTenant(tenant_id: number): Promise<DashboardKpiFromDB[]> {
    const [rows] = await pool.execute<DashboardKpiFromDB[]>(
      'SELECT * FROM dashboard_kpis WHERE tenant_id = ?',
      [tenant_id]
    );
    return rows;
  }

  async findById(tenant_id: number, id: number): Promise<DashboardKpiFromDB | null> {
    const [rows] = await pool.execute<DashboardKpiFromDB[]>(
      'SELECT * FROM dashboard_kpis WHERE id = ? AND tenant_id = ?',
      [id, tenant_id]
    );
    return rows[0] || null;
  }

  async update(tenant_id: number, id: number, dashboardKpiData: Partial<DashboardKpiData>): Promise<boolean> {
    const fields = Object.keys(dashboardKpiData);
    const values = Object.values(dashboardKpiData);
    
    if (fields.length === 0) {
      return false;
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    
    const [result] = await pool.execute<ResultSetHeader>(
      `UPDATE dashboard_kpis SET ${setClause} WHERE id = ? AND tenant_id = ?`,
      [...values, id, tenant_id]
    );
    return result.affectedRows > 0;
  }

  async delete(tenant_id: number, id: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM dashboard_kpis WHERE id = ? AND tenant_id = ?',
      [id, tenant_id]
    );
    return result.affectedRows > 0;
  }
}

export default new DashboardKpiRepository();
