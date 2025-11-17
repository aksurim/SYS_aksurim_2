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

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  cost: number | null;
  product_type: 'FinishedGood' | 'RawMaterial' | 'Service';
  is_reverse_logistics: boolean;
}

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "price",
    header: "Preço",
  },
  {
    accessorKey: "cost",
    header: "Custo",
  },
  {
    accessorKey: "product_type",
    header: "Tipo",
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const navigate = useNavigate();
      const product = row.original;

      const handleEdit = () => {
        navigate(`/products/${product.id}`);
      };

      const handleDelete = async () => {
        if (window.confirm(`Tem certeza que deseja deletar o produto ${product.name}?`)) {
          const token = sessionStorage.getItem('authToken');
          if (!token) {
            alert('Usuário não autenticado.');
            return;
          }
          try {
            await axios.delete(`/api/products/${product.id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            alert('Produto deletado com sucesso!');
            window.location.reload();
          } catch (error) {
            console.error('Erro ao deletar produto:', error);
            alert('Erro ao deletar produto.');
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

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        setError('Usuário não autenticado.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/api/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (err: any) {
        console.error('Erro ao buscar produtos:', err);
        setError(err.response?.data?.message || 'Erro ao carregar produtos.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    navigate('/products/new');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p>Carregando produtos...</p>
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
          <h2 className="text-3xl font-bold tracking-tight">Produtos</h2>
          <Button onClick={handleAddProduct}>Adicionar Produto</Button>
        </div>
        <DataTable columns={columns} data={products} />
      </div>
    </div>
  );
}
