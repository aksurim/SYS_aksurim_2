/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from 'axios';

interface ProductFormData {
  name: string;
  description?: string;
  price: number;
  cost?: number;
  product_type: 'FinishedGood' | 'RawMaterial' | 'Service';
  is_reverse_logistics?: boolean;
}

export function ProductFormPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    cost: 0,
    product_type: 'FinishedGood',
    is_reverse_logistics: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      if (isEditing) {
        setLoading(true);
        setError(null);
        const token = sessionStorage.getItem('authToken');
        if (!token) {
          setError('Usuário não autenticado.');
          setLoading(false);
          return;
        }

        try {
          const response = await axios.get(`/api/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFormData(response.data);
        } catch (err) {
          console.error('Erro ao carregar dados do produto:', err);
          setError('Não foi possível carregar os dados do produto.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProductData();
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSelectChange = (value: 'FinishedGood' | 'RawMaterial' | 'Service') => {
    setFormData((prev) => ({ ...prev, product_type: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = sessionStorage.getItem('authToken');
    if (!token) {
      setError('Usuário não autenticado.');
      setLoading(false);
      return;
    }

    const payload: ProductFormData = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      cost: Number(formData.cost),
      product_type: formData.product_type,
      is_reverse_logistics: formData.is_reverse_logistics,
    };

    try {
      if (isEditing) {
        await axios.put(`/api/products/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('/api/products', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate('/products');
    } catch (err: any) {
      console.error('Erro ao salvar produto:', err);
      setError(err.response?.data?.message || 'Erro ao salvar produto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">{isEditing ? 'Editar Produto' : 'Novo Produto'}</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && isEditing ? (
            <p className="text-center">Carregando dados do produto...</p>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4">
              {error && <p className="text-destructive text-sm mb-4">{error}</p>}

              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Preço</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cost">Custo</Label>
                  <Input
                    id="cost"
                    type="number"
                    value={formData.cost || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="product_type">Tipo de Produto</Label>
                <Select onValueChange={handleSelectChange} value={formData.product_type}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FinishedGood">Produto Acabado</SelectItem>
                    <SelectItem value="RawMaterial">Matéria-Prima</SelectItem>
                    <SelectItem value="Service">Serviço</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  id="is_reverse_logistics"
                  type="checkbox"
                  checked={formData.is_reverse_logistics}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <Label htmlFor="is_reverse_logistics">Logística Reversa</Label>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <Button type="button" variant="outline" onClick={() => navigate('/products')}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Salvando...' : (isEditing ? 'Atualizar Produto' : 'Criar Produto')}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
