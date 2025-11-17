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

interface TransactionFormData {
  account_id: number;
  category_id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
}

interface Account {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

export function TransactionFormPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [formData, setFormData] = useState<TransactionFormData>({
    account_id: 0,
    category_id: 0,
    description: '',
    amount: 0,
    type: 'income',
    date: '',
  });
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        setError('Usuário não autenticado.');
        return;
      }

      try {
        const [accountsResponse, categoriesResponse] = await Promise.all([
          axios.get('/api/accounts', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/categories', { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setAccounts(accountsResponse.data);
        setCategories(categoriesResponse.data);

        if (isEditing) {
          setLoading(true);
          const response = await axios.get(`/api/transactions/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const transactionData = response.data;
          if (transactionData.date) {
            transactionData.date = new Date(transactionData.date).toISOString().split('T')[0];
          }
          setFormData(transactionData);
        }
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError('Não foi possível carregar os dados.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: 'account_id' | 'category_id' | 'type', value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

    const payload: TransactionFormData = {
      ...formData,
      amount: Number(formData.amount),
    };

    try {
      if (isEditing) {
        await axios.put(`/api/transactions/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('/api/transactions', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate('/transactions');
    } catch (err: any) {
      console.error('Erro ao salvar transação:', err);
      setError(err.response?.data?.message || 'Erro ao salvar transação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">{isEditing ? 'Editar Transação' : 'Nova Transação'}</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && isEditing ? (
            <p className="text-center">Carregando dados da transação...</p>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4">
              {error && <p className="text-destructive text-sm mb-4">{error}</p>}

              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="amount">Valor</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Tipo</Label>
                <Select onValueChange={(value: 'income' | 'expense') => handleSelectChange('type', value)} value={formData.type}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Receita</SelectItem>
                    <SelectItem value="expense">Despesa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="account_id">Conta</Label>
                <Select onValueChange={(value) => handleSelectChange('account_id', parseInt(value))} value={String(formData.account_id)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a conta" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map(account => (
                      <SelectItem key={account.id} value={String(account.id)}>
                        {account.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category_id">Categoria</Label>
                <Select onValueChange={(value) => handleSelectChange('category_id', parseInt(value))} value={String(formData.category_id)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={String(category.id)}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <Button type="button" variant="outline" onClick={() => navigate('/transactions')}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Salvando...' : (isEditing ? 'Atualizar Transação' : 'Criar Transação')}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
