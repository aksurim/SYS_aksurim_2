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

interface ReportFormData {
  name: string;
  type: string;
  filters: { filter_key: string; filter_value: string }[];
}

export function ReportFormPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isViewing = !!id;
  const [formData, setFormData] = useState<ReportFormData>({
    name: '',
    type: '',
    filters: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReportData = async () => {
      if (isViewing) {
        setLoading(true);
        setError(null);
        const token = sessionStorage.getItem('authToken');
        if (!token) {
          setError('Usuário não autenticado.');
          setLoading(false);
          return;
        }

        try {
          const response = await axios.get(`/api/reports/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFormData(response.data);
        } catch (err) {
          console.error('Erro ao carregar dados do relatório:', err);
          setError('Não foi possível carregar os dados do relatório.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchReportData();
  }, [id, isViewing]);

  const handleAddFilter = () => {
    setFormData(prev => ({
      ...prev,
      filters: [...prev.filters, { filter_key: '', filter_value: '' }],
    }));
  };

  const handleFilterChange = (index: number, field: 'filter_key' | 'filter_value', value: string) => {
    const newFilters = [...formData.filters];
    newFilters[index][field] = value;
    setFormData(prev => ({ ...prev, filters: newFilters }));
  };

  const handleRemoveFilter = (index: number) => {
    const newFilters = [...formData.filters];
    newFilters.splice(index, 1);
    setFormData(prev => ({ ...prev, filters: newFilters }));
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
      await axios.post('/api/reports', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/reports');
    } catch (err: any) {
      console.error('Erro ao salvar relatório:', err);
      setError(err.response?.data?.message || 'Erro ao salvar relatório.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">{isViewing ? 'Visualizar Relatório' : 'Novo Relatório'}</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && isViewing ? (
            <p className="text-center">Carregando dados do relatório...</p>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4">
              {error && <p className="text-destructive text-sm mb-4">{error}</p>}

              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  disabled={isViewing}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Tipo</Label>
                <Input
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  required
                  disabled={isViewing}
                />
              </div>

              <h3 className="text-lg font-semibold mt-4">Filtros</h3>
              {formData.filters.map((filter, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 items-center">
                  <Input
                    value={filter.filter_key}
                    onChange={(e) => handleFilterChange(index, 'filter_key', e.target.value)}
                    placeholder="Chave do Filtro"
                    disabled={isViewing}
                  />
                  <Input
                    value={filter.filter_value}
                    onChange={(e) => handleFilterChange(index, 'filter_value', e.target.value)}
                    placeholder="Valor do Filtro"
                    disabled={isViewing}
                  />
                  {!isViewing && (
                    <Button type="button" variant="destructive" size="sm" onClick={() => handleRemoveFilter(index)}>
                      Remover
                    </Button>
                  )}
                </div>
              ))}
              {!isViewing && (
                <Button type="button" variant="outline" onClick={handleAddFilter}>
                  Adicionar Filtro
                </Button>
              )}

              <div className="flex justify-end space-x-2 mt-4">
                <Button type="button" variant="outline" onClick={() => navigate('/reports')}>
                  Voltar
                </Button>
                {!isViewing && (
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Salvando...' : 'Criar Relatório'}
                  </Button>
                )}
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
