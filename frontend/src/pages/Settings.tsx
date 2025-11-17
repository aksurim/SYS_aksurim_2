/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from 'axios';

interface SettingsFormData {
  company_name?: string;
  logo_url?: string;
  instagram?: string;
  contact?: string;
}

export function SettingsPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SettingsFormData>({
    company_name: '',
    logo_url: '',
    instagram: '',
    contact: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      setError(null);
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        setError('Usuário não autenticado.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/api/settings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data) {
          setFormData(response.data);
        }
      } catch (err) {
        console.error('Erro ao carregar configurações:', err);
        // Não é um erro crítico se não houver configurações
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

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

    try {
      await axios.put('/api/settings', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Configurações salvas com sucesso!');
    } catch (err: any) {
      console.error('Erro ao salvar configurações:', err);
      setError(err.response?.data?.message || 'Erro ao salvar configurações.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Configurações</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center">Carregando configurações...</p>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4">
              {error && <p className="text-destructive text-sm mb-4">{error}</p>}

              <div className="grid gap-2">
                <Label htmlFor="company_name">Nome da Empresa</Label>
                <Input
                  id="company_name"
                  value={formData.company_name || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="logo_url">URL do Logo</Label>
                <Input
                  id="logo_url"
                  value={formData.logo_url || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={formData.instagram || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact">Contato</Label>
                <Input
                  id="contact"
                  value={formData.contact || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Salvando...' : 'Salvar Configurações'}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
