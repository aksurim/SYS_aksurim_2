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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Customer {
  id: number;
  name: string;
}

interface SaleItem {
  product_id: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export function PdvPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<SaleItem[]>([]);
  const [total, setTotal] = useState(0);
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
        const [productsResponse, customersResponse] = await Promise.all([
          axios.get('/api/products', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/customers', { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setProducts(productsResponse.data);
        setCustomers(customersResponse.data);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
        setError('Erro ao carregar produtos e clientes.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => acc + item.total, 0);
    setTotal(newTotal);
  }, [cart]);

  const handleAddProduct = () => {
    if (!selectedProduct || quantity <= 0) {
      return;
    }

    const product = products.find(p => p.id === parseInt(selectedProduct));
    if (!product) {
      return;
    }

    const existingItem = cart.find(item => item.product_id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.product_id === product.id
          ? { ...item, quantity: item.quantity + quantity, total: (item.quantity + quantity) * item.price }
          : item
      ));
    } else {
      setCart([...cart, {
        product_id: product.id,
        name: product.name,
        quantity,
        price: product.price,
        total: quantity * product.price,
      }]);
    }

    setSelectedProduct('');
    setQuantity(1);
  };

  const handleRemoveItem = (product_id: number) => {
    setCart(cart.filter(item => item.product_id !== product_id));
  };

  const handleFinishSale = async () => {
    if (cart.length === 0) {
      setError('O carrinho está vazio.');
      return;
    }

    setLoading(true);
    setError(null);

    const token = sessionStorage.getItem('authToken');
    if (!token) {
      setError('Usuário não autenticado.');
      setLoading(false);
      return;
    }

    const saleData = {
      customer_id: selectedCustomer ? parseInt(selectedCustomer) : undefined,
      total,
      items: cart.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      await axios.post('/api/sales', saleData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Venda finalizada com sucesso!');
      setCart([]);
      setSelectedCustomer('');
    } catch (err) {
      console.error('Erro ao finalizar venda:', err);
      setError('Erro ao finalizar venda.');
    } finally {
      setLoading(false);
    }
  };

  const cartColumns: ColumnDef<SaleItem>[] = [
    {
      accessorKey: "name",
      header: "Produto",
    },
    {
      accessorKey: "quantity",
      header: "Qtd.",
    },
    {
      accessorKey: "price",
      header: "Preço Unit.",
    },
    {
      accessorKey: "total",
      header: "Total",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button variant="destructive" size="sm" onClick={() => handleRemoveItem(row.original.product_id)}>
          Remover
        </Button>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="container mx-auto py-10">
        <h2 className="text-3xl font-bold tracking-tight mb-6">PDV - Ponto de Venda</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Carrinho</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable columns={cartColumns} data={cart} />
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Produto</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="product">Produto</Label>
                  <Select onValueChange={setSelectedProduct} value={selectedProduct}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um produto" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map(product => (
                        <SelectItem key={product.id} value={String(product.id)}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="quantity">Quantidade</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    min="1"
                  />
                </div>
                <Button onClick={handleAddProduct}>Adicionar ao Carrinho</Button>
              </CardContent>
            </Card>
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Finalizar Venda</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="customer">Cliente (Opcional)</Label>
                  <Select onValueChange={setSelectedCustomer} value={selectedCustomer}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map(customer => (
                        <SelectItem key={customer.id} value={String(customer.id)}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-2xl font-bold text-right">
                  Total: R$ {total.toFixed(2)}
                </div>
                {error && <p className="text-destructive text-sm">{error}</p>}
                <Button onClick={handleFinishSale} disabled={loading || cart.length === 0} className="w-full">
                  {loading ? 'Finalizando...' : 'Finalizar Venda'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
