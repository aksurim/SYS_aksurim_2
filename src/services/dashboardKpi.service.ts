/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import DashboardKpiRepository, { DashboardKpiData, DashboardKpiFromDB } from '../repositories/dashboardKpi.repository';

class DashboardKpiService {
  async create(tenant_id: number, dashboardKpiData: DashboardKpiData): Promise<DashboardKpiFromDB> {
    if (!dashboardKpiData.name) {
      throw new Error('O nome do KPI é obrigatório.');
    }
    const newDashboardKpiId = await DashboardKpiRepository.create(tenant_id, dashboardKpiData);
    const newDashboardKpi = await DashboardKpiRepository.findById(tenant_id, newDashboardKpiId);
    if (!newDashboardKpi) {
      throw new Error('Falha ao criar e recuperar o KPI.');
    }
    return newDashboardKpi;
  }

  async getAll(tenant_id: number): Promise<DashboardKpiFromDB[]> {
    return DashboardKpiRepository.findAllByTenant(tenant_id);
  }

  async getById(tenant_id: number, id: number): Promise<DashboardKpiFromDB | null> {
    return DashboardKpiRepository.findById(tenant_id, id);
  }

  async update(tenant_id: number, id: number, dashboardKpiData: Partial<DashboardKpiData>): Promise<DashboardKpiFromDB | null> {
    const success = await DashboardKpiRepository.update(tenant_id, id, dashboardKpiData);
    if (!success) {
      const existingDashboardKpi = await DashboardKpiRepository.findById(tenant_id, id);
      if (!existingDashboardKpi) {
        throw new Error('KPI não encontrado ou não pertence à sua empresa.');
      }
    }
    return DashboardKpiRepository.findById(tenant_id, id);
  }

  async delete(tenant_id: number, id: number): Promise<void> {
    const success = await DashboardKpiRepository.delete(tenant_id, id);
    if (!success) {
      throw new Error('KPI não encontrado ou não pertence à sua empresa.');
    }
  }
}

export default new DashboardKpiService();
