/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import React, { useEffect, useState } from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface Report {
  id: number;
  name: string;
  type: string;
}

const columns: ColumnDef<Report>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const navigate = useNavigate();
      const report = row.original;

      const handleView = () => {
        navigate(`/reports/${report.id}`);
      };

      return (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleView}>Visualizar</Button>
        </div>
      );
    },
  },
];

export function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        setError('Usuário não autenticado.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/api/reports', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReports(response.data);
      } catch (err: any) {
        console.error('Erro ao buscar relatórios:', err);
        setError(err.response?.data?.message || 'Erro ao carregar relatórios.');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleAddReport = () => {
    navigate('/reports/new');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p>Carregando relatórios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Relatórios</h2>
          <Button onClick={handleAddReport}>Adicionar Relatório</Button>
        </div>
        <DataTable columns={columns} data={reports} />
      </div>
    </div>
  );
}
