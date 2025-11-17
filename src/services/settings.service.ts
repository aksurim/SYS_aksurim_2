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
      await SettingsRepository.update(tenant_id, settingsData);
    } else {
      await SettingsRepository.create(tenant_id, settingsData);
    }
    return SettingsRepository.findByTenant(tenant_id);
  }
}

export default new SettingsService();
