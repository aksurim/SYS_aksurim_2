/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import ReportRepository, { ReportData, ReportFromDB } from '../repositories/report.repository';

class ReportService {
  async create(tenant_id: number, reportData: ReportData): Promise<ReportFromDB> {
    if (!reportData.name) {
      throw new Error('O nome do relatório é obrigatório.');
    }
    const newReportId = await ReportRepository.create(tenant_id, reportData);
    const newReport = await ReportRepository.findById(tenant_id, newReportId);
    if (!newReport) {
      throw new Error('Falha ao criar e recuperar o relatório.');
    }
    return newReport;
  }

  async getAll(tenant_id: number): Promise<ReportFromDB[]> {
    return ReportRepository.findAllByTenant(tenant_id);
  }

  async getById(tenant_id: number, id: number): Promise<ReportFromDB | null> {
    return ReportRepository.findById(tenant_id, id);
  }
}

export default new ReportService();
