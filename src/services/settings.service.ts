/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import SettingsRepository, { SettingsData, SettingsFromDB } from '../repositories/settings.repository';

class SettingsService {
  async get(tenant_id: number): Promise<SettingsFromDB | null> {
    return SettingsRepository.findByTenant(tenant_id);
  }

  async createOrUpdate(tenant_id: number, settingsData: SettingsData): Promise<SettingsFromDB | null> {
    const existingSettings = await SettingsRepository.findByTenant(tenant_id);
    if (existingSettings) {
      // Regra de Negócio: Apenas campos permitidos podem ser atualizados.
      const allowedUpdateData: Partial<SettingsData> = {
        company_name: settingsData.company_name,
        logo_url: settingsData.logo_url,
        instagram: settingsData.instagram,
        contact: settingsData.contact,
      };
      await SettingsRepository.update(tenant_id, allowedUpdateData);
    } else {
      await SettingsRepository.create(tenant_id, settingsData);
    }
    return SettingsRepository.findByTenant(tenant_id);
  }
}

export default new SettingsService();
