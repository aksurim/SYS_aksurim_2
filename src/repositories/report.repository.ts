/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import pool from '../database/mysql';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface ReportFromDB extends RowDataPacket {
  id: number;
  tenant_id: number;
  name: string;
  type: string;
}

export interface ReportFilterFromDB extends RowDataPacket {
  filter_name: string;
  filter_value: string;
}

export interface ReportData {
  name: string;
  type: string;
  filters: { filter_key: string; filter_value: string }[];
}

class ReportRepository {
  async create(tenant_id: number, reportData: ReportData): Promise<number> {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      const { name, type, filters } = reportData;
      
      const [reportResult] = await connection.execute<ResultSetHeader>(
        'INSERT INTO reports (tenant_id, name, type) VALUES (?, ?, ?)',
        [tenant_id, name, type]
      );
      const reportId = reportResult.insertId;

      if (filters && filters.length > 0) {
        const reportFiltersQueries = filters.map(filter => {
          return connection.execute(
            'INSERT INTO report_filters (tenant_id, report_id, filter_name, filter_value) VALUES (?, ?, ?, ?)',
            [tenant_id, reportId, filter.filter_key, filter.filter_value]
          );
        });
  
        await Promise.all(reportFiltersQueries);
      }

      await connection.commit();
      connection.release();
      return reportId;
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  }

  async findAllByTenant(tenant_id: number): Promise<ReportFromDB[]> {
    const [rows] = await pool.execute<ReportFromDB[]>(
      'SELECT * FROM reports WHERE tenant_id = ?',
      [tenant_id]
    );
    return rows;
  }

  async findById(tenant_id: number, id: number): Promise<any | null> {
    // Busca os dados principais do relatório
    const [reportRows] = await pool.execute<ReportFromDB[]>(
      'SELECT * FROM reports WHERE id = ? AND tenant_id = ?',
      [id, tenant_id]
    );

    if (!reportRows[0]) {
      return null;
    }

    const report = reportRows[0];

    // Busca os filtros associados
    const [filterRows] = await pool.execute<ReportFilterFromDB[]>(
      'SELECT filter_name, filter_value FROM report_filters WHERE report_id = ? AND tenant_id = ?',
      [id, tenant_id]
    );

    // Mapeia os nomes do banco de dados (`filter_name`) para o que o frontend espera (`filter_key`)
    const filters = filterRows.map(filter => ({
      filter_key: filter.filter_name,
      filter_value: filter.filter_value,
    }));

    return {
      ...report,
      filters: filters,
    };
  }
}

export default new ReportRepository();
