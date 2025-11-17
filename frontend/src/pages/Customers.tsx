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

interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  document?: string;
  birth_date?: string;
  address?: string;
}

const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
  {
    accessorKey: "document",
    header: "Documento",
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const navigate = useNavigate();
      const customer = row.original;

      const handleEdit = () => {
        navigate(`/customers/${customer.id}`);
      };

      const handleDelete = async () => {
        if (window.confirm(`Tem certeza que deseja deletar o cliente ${customer.name}?`)) {
          const token = sessionStorage.getItem('authToken');
          if (!token) {
            alert('Usuário não autenticado.');
            return;
          }
          try {
            await axios.delete(`/api/customers/${customer.id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            alert('Cliente deletado com sucesso!');
            window.location.reload();
          } catch (error) {
            console.error('Erro ao deletar cliente:', error);
            alert('Erro ao deletar cliente.');
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

export function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        setError('Usuário não autenticado.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/api/customers', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomers(response.data);
      } catch (err: any) {
        console.error('Erro ao buscar clientes:', err);
        setError(err.response?.data?.message || 'Erro ao carregar clientes.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleAddCustomer = () => {
    navigate('/customers/new');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p>Carregando clientes...</p>
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
          <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
          <Button onClick={handleAddCustomer}>Adicionar Cliente</Button>
        </div>
        <DataTable columns={columns} data={customers} />
      </div>
    </div>
  );
}
