/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import AuditLogRepository, { AuditLogData, AuditLogFromDB } from '../repositories/auditLog.repository';

class AuditLogService {
  async create(tenant_id: number, auditLogData: AuditLogData): Promise<AuditLogFromDB> {
    const newAuditLogId = await AuditLogRepository.create(tenant_id, auditLogData);
    const newAuditLog = await AuditLogRepository.findById(tenant_id, newAuditLogId);
    if (!newAuditLog) {
      throw new Error('Falha ao criar e recuperar o log de auditoria.');
    }
    return newAuditLog;
  }

  async getAll(tenant_id: number): Promise<AuditLogFromDB[]> {
    return AuditLogRepository.findAllByTenant(tenant_id);
  }

  async getById(tenant_id: number, id: number): Promise<AuditLogFromDB | null> {
    return AuditLogRepository.findById(tenant_id, id);
  }
}

export default new AuditLogService();
