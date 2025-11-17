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

interface Category {
  id: number;
  name: string;
  type: 'income' | 'expense';
}

const columns: ColumnDef<Category>[] = [
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
      const category = row.original;

      const handleEdit = () => {
        navigate(`/categories/${category.id}`);
      };

      const handleDelete = async () => {
        if (window.confirm(`Tem certeza que deseja deletar a categoria ${category.name}?`)) {
          const token = sessionStorage.getItem('authToken');
          if (!token) {
            alert('Usuário não autenticado.');
            return;
          }
          try {
            await axios.delete(`/api/categories/${category.id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            alert('Categoria deletada com sucesso!');
            window.location.reload();
          } catch (error) {
            console.error('Erro ao deletar categoria:', error);
            alert('Erro ao deletar categoria.');
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

export function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        setError('Usuário não autenticado.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/api/categories', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data);
      } catch (err: any) {
        console.error('Erro ao buscar categorias:', err);
        setError(err.response?.data?.message || 'Erro ao carregar categorias.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    navigate('/categories/new');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p>Carregando categorias...</p>
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
          <h2 className="text-3xl font-bold tracking-tight">Categorias</h2>
          <Button onClick={handleAddCategory}>Adicionar Categoria</Button>
        </div>
        <DataTable columns={columns} data={categories} />
      </div>
    </div>
  );
}
