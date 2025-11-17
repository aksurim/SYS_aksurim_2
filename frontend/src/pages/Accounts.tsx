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

interface Account {
  id: number;
  name: string;
  balance: number;
}

const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "balance",
    header: "Saldo",
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const navigate = useNavigate();
      const account = row.original;

      const handleEdit = () => {
        navigate(`/accounts/${account.id}`);
      };

      const handleDelete = async () => {
        if (window.confirm(`Tem certeza que deseja deletar a conta ${account.name}?`)) {
          const token = sessionStorage.getItem('authToken');
          if (!token) {
            alert('Usuário não autenticado.');
            return;
          }
          try {
            await axios.delete(`/api/accounts/${account.id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            alert('Conta deletada com sucesso!');
            window.location.reload();
          } catch (error) {
            console.error('Erro ao deletar conta:', error);
            alert('Erro ao deletar conta.');
          }
        }
      };

      return (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleEdit}>Editar</Button>
          <Button variant="destructive" size="sm" onClick={handleDelete}>Deletar</Button>
        </div>
      );
    },
  },
];

export function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        setError('Usuário não autenticado.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/api/accounts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAccounts(response.data);
      } catch (err: any) {
        console.error('Erro ao buscar contas:', err);
        setError(err.response?.data?.message || 'Erro ao carregar contas.');
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleAddAccount = () => {
    navigate('/accounts/new');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p>Carregando contas...</p>
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
          <h2 className="text-3xl font-bold tracking-tight">Contas</h2>
          <Button onClick={handleAddAccount}>Adicionar Conta</Button>
        </div>
        <DataTable columns={columns} data={accounts} />
      </div>
    </div>
  );
}
