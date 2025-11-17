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
import axios from 'axios';

interface CustomerFormData {
  name: string;
  email: string;
  document?: string;
  phone?: string;
  birth_date?: string;
  address?: string;
}

export function CustomerFormPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [formData, setFormData] = useState<CustomerFormData>({
    name: '',
    email: '',
    document: '',
    phone: '',
    birth_date: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
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
          const response = await axios.get(`/api/customers/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const customerData = response.data;
          if (customerData.birth_date) {
            customerData.birth_date = new Date(customerData.birth_date).toISOString().split('T')[0];
          }
          setFormData(customerData);
        } catch (err) {
          console.error('Erro ao carregar dados do cliente:', err);
          setError('Não foi possível carregar os dados do cliente.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCustomerData();
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
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

    const payload: CustomerFormData = {
      name: formData.name,
      email: formData.email,
      document: formData.document,
      phone: formData.phone,
      birth_date: formData.birth_date,
      address: formData.address,
    };

    try {
      if (isEditing) {
        await axios.put(`/api/customers/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('/api/customers', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate('/customers');
    } catch (err: any) {
      console.error('Erro ao salvar cliente:', err);
      setError(err.response?.data?.message || 'Erro ao salvar cliente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">{isEditing ? 'Editar Cliente' : 'Novo Cliente'}</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && isEditing ? (
            <p className="text-center">Carregando dados do cliente...</p>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4">
              {error && <p className="text-destructive text-sm mb-4">{error}</p>}

              <div className="grid gap-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@exemplo.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="document">CPF/CNPJ</Label>
                <Input
                  id="document"
                  value={formData.document || ''}
                  onChange={handleChange}
                  placeholder="Ex: 123.456.789-00"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  placeholder="Ex: (XX) XXXXX-XXXX"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="birth_date">Data de Nascimento</Label>
                <Input
                  id="birth_date"
                  type="date"
                  value={formData.birth_date || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={formData.address || ''}
                  onChange={handleChange}
                  placeholder="Ex: Rua Exemplo, 123 - Bairro"
                />
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <Button type="button" variant="outline" onClick={() => navigate('/customers')}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Salvando...' : (isEditing ? 'Atualizar Cliente' : 'Criar Cliente')}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
