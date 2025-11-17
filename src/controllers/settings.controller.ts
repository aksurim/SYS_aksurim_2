/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import { Request, Response } from 'express';
import SettingsService from '../services/settings.service';

class SettingsController {
  async get(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const settings = await SettingsService.get(tenant_id);
      if (settings) {
        res.status(200).json(settings);
      } else {
        res.status(404).json({ message: 'Configurações não encontradas.' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createOrUpdate(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const updatedSettings = await SettingsService.createOrUpdate(tenant_id, req.body);
      res.status(200).json(updatedSettings);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new SettingsController();
