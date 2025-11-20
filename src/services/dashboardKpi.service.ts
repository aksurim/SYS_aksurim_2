/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import DashboardKpiRepository, { DashboardKpiData, DashboardKpiFromDB } from '../repositories/dashboardKpi.repository';

// Interface para os dados que o frontend espera
interface Kpi {
  name: string;
  value: string;
}

class DashboardKpiService {
  // Retorna dados mockados para permitir o teste da interface do Dashboard.
  // A lógica real de cálculo dos KPIs será implementada futuramente.
  async getAll(tenant_id: number): Promise<Kpi[]> {
    // Simula a busca e cálculo de KPIs
    const mockKpis: Kpi[] = [
      { name: 'Lucro Líquido (Mês)', value: 'R$ 0,00' },
      { name: 'Vendas (Hoje)', value: 'R$ 0,00' },
      { name: 'Contas a Pagar (Hoje)', value: 'R$ 0,00' },
      { name: 'Contas a Receber (Hoje)', value: 'R$ 0,00' },
    ];
    return Promise.resolve(mockKpis);
  }

  // As funções abaixo são placeholders e precisarão ser refatoradas ou removidas
  // quando a lógica de cálculo real for implementada.

  async create(tenant_id: number, dashboardKpiData: any): Promise<any> {
    throw new Error('Funcionalidade não aplicável. KPIs são calculados, não criados.');
  }

  async getById(tenant_id: number, id: number): Promise<any | null> {
    throw new Error('Funcionalidade não aplicável.');
  }

  async update(tenant_id: number, id: number, dashboardKpiData: any): Promise<any | null> {
    throw new Error('Funcionalidade não aplicável.');
  }

  async delete(tenant_id: number, id: number): Promise<void> {
    throw new Error('Funcionalidade não aplicável.');
  }
}

export default new DashboardKpiService();
