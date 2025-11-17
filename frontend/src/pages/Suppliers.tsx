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

// Definindo a interface para os dados do fornecedor
interface Supplier {
  id: number;
  name: string;
  email: string;
  phone?: string;
  document?: string;
  address?: string;
}

// Definindo as colunas da tabela
const columns: ColumnDef<Supplier>[] = [
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
      const supplier = row.original;

      const handleEdit = () => {
        navigate(`/suppliers/${supplier.id}`);
      };

      const handleDelete = async () => {
        if (window.confirm(`Tem certeza que deseja deletar o fornecedor ${supplier.name}?`)) {
          const token = sessionStorage.getItem('authToken');
          if (!token) {
            alert('Usuário não autenticado.');
            return;
          }
          try {
            await axios.delete(`/api/suppliers/${supplier.id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            alert('Fornecedor deletado com sucesso!');
            window.location.reload();
          } catch (error) {
            console.error('Erro ao deletar fornecedor:', error);
            alert('Erro ao deletar fornecedor.');
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

export function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        setError('Usuário não autenticado.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/api/suppliers', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuppliers(response.data);
      } catch (err: any) {
        console.error('Erro ao buscar fornecedores:', err);
        setError(err.response?.data?.message || 'Erro ao carregar fornecedores.');
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const handleAddSupplier = () => {
    navigate('/suppliers/new');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p>Carregando fornecedores...</p>
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
          <h2 className="text-3xl font-bold tracking-tight">Fornecedores</h2>
          <Button onClick={handleAddSupplier}>Adicionar Fornecedor</Button>
        </div>
        <DataTable columns={columns} data={suppliers} />
      </div>
    </div>
  );
}
