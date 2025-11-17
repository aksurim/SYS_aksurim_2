/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import { Request, Response } from 'express';
import AuditLogService from '../services/auditLog.service';

class AuditLogController {
  async create(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const newAuditLog = await AuditLogService.create(tenant_id, req.body);
      res.status(201).json(newAuditLog);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const auditLogs = await AuditLogService.getAll(tenant_id);
      res.status(200).json(auditLogs);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const id = parseInt(req.params.id, 10);
      const auditLog = await AuditLogService.getById(tenant_id, id);
      if (auditLog) {
        res.status(200).json(auditLog);
      } else {
        res.status(404).json({ message: 'Log de auditoria não encontrado.' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new AuditLogController();
