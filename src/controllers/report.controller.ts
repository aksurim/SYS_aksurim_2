/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import { Request, Response } from 'express';
import ReportService from '../services/report.service';

class ReportController {
  async create(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const newReport = await ReportService.create(tenant_id, req.body);
      res.status(201).json(newReport);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const reports = await ReportService.getAll(tenant_id);
      res.status(200).json(reports);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const tenant_id = req.user.tenant_id;
      const id = parseInt(req.params.id, 10);
      const report = await ReportService.getById(tenant_id, id);
      if (report) {
        res.status(200).json(report);
      } else {
        res.status(404).json({ message: 'Relatório não encontrado.' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new ReportController();
