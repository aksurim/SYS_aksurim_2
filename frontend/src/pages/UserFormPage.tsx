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

interface UserFormData {
  email: string;
  password?: string; // Apenas para criação ou redefinição
  role: string;
  // Permissões serão gerenciadas separadamente
}

export function UserFormPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    password: '',
    role: 'user',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
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
          const response = await axios.get(`/api/users/${id}`, { // Assumindo endpoint /api/users
            headers: { Authorization: `Bearer ${token}` },
          });
          setFormData(response.data);
        } catch (err) {
          console.error('Erro ao carregar dados do usuário:', err);
          setError('Não foi possível carregar os dados do usuário.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
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

    const payload: UserFormData = {
      email: formData.email,
      role: formData.role,
    };
    if (formData.password) { // Envia a senha apenas se for fornecida (criação ou redefinição)
      payload.password = formData.password;
    }

    try {
      if (isEditing) {
        await axios.put(`/api/users/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('/api/users', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate('/users');
    } catch (err: any) {
      console.error('Erro ao salvar usuário:', err);
      setError(err.response?.data?.message || 'Erro ao salvar usuário.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">{isEditing ? 'Editar Usuário' : 'Novo Usuário'}</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && isEditing ? (
            <p className="text-center">Carregando dados do usuário...</p>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4">
              {error && <p className="text-destructive text-sm mb-4">{error}</p>}

              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isEditing} // E-mail geralmente não é editável após a criação
                />
              </div>
              {!isEditing && ( // Senha só é necessária na criação
                <div className="grid gap-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required={!isEditing}
                  />
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="role">Função</Label>
                <Select onValueChange={handleSelectChange} value={formData.role}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a função" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="user">Usuário Padrão</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <Button type="button" variant="outline" onClick={() => navigate('/users')}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Salvando...' : (isEditing ? 'Atualizar Usuário' : 'Criar Usuário')}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
