/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/Login';
import { CustomersPage } from './pages/Customers';
import { CustomerFormPage } from './pages/CustomerFormPage';
import { SuppliersPage } from './pages/Suppliers';
import { SupplierFormPage } from './pages/SupplierFormPage';
import { ProductsPage } from './pages/Products';
import { ProductFormPage } from './pages/ProductFormPage';
import { PdvPage } from './pages/Pdv';
import { AccountsPage } from './pages/Accounts';
import { AccountFormPage } from './pages/AccountFormPage';
import { CategoriesPage } from './pages/Categories';
import { CategoryFormPage } from './pages/CategoryFormPage';
import { TransactionsPage } from './pages/Transactions';
import { TransactionFormPage } from './pages/TransactionFormPage';
import { SettingsPage } from './pages/Settings';
import { ReportsPage } from './pages/Reports';
import { ReportFormPage } from './pages/ReportFormPage';
import { DashboardPage } from './pages/Dashboard';
import { UsersPage } from './pages/Users';
import { UserFormPage } from './pages/UserFormPage';

// Componente de rota protegida
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('authToken');
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      {/* Rotas de Clientes */}
      <Route
        path="/customers"
        element={
          <PrivateRoute>
            <CustomersPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/customers/new"
        element={
          <PrivateRoute>
            <CustomerFormPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/customers/:id"
        element={
          <PrivateRoute>
            <CustomerFormPage />
          </PrivateRoute>
        }
      />
      {/* Rotas de Fornecedores */}
      <Route
        path="/suppliers"
        element={
          <PrivateRoute>
            <SuppliersPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/suppliers/new"
        element={
          <PrivateRoute>
            <SupplierFormPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/suppliers/:id"
        element={
          <PrivateRoute>
            <SupplierFormPage />
          </PrivateRoute>
        }
      />
      {/* Rotas de Produtos */}
      <Route
        path="/products"
        element={
          <PrivateRoute>
            <ProductsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/products/new"
        element={
          <PrivateRoute>
            <ProductFormPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/products/:id"
        element={
          <PrivateRoute>
            <ProductFormPage />
          </PrivateRoute>
        }
      />
      {/* Rota de PDV */}
      <Route
        path="/pdv"
        element={
          <PrivateRoute>
            <PdvPage />
          </PrivateRoute>
        }
      />
      {/* Rotas de Contas */}
      <Route
        path="/accounts"
        element={
          <PrivateRoute>
            <AccountsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/accounts/new"
        element={
          <PrivateRoute>
            <AccountFormPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/accounts/:id"
        element={
          <PrivateRoute>
            <AccountFormPage />
          </PrivateRoute>
        }
      />
      {/* Rotas de Categorias */}
      <Route
        path="/categories"
        element={
          <PrivateRoute>
            <CategoriesPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/categories/new"
        element={
          <PrivateRoute>
            <CategoryFormPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/categories/:id"
        element={
          <PrivateRoute>
            <CategoryFormPage />
          </PrivateRoute>
        }
      />
      {/* Rotas de Transações */}
      <Route
        path="/transactions"
        element={
          <PrivateRoute>
            <TransactionsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/transactions/new"
        element={
          <PrivateRoute>
            <TransactionFormPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/transactions/:id"
        element={
          <PrivateRoute>
            <TransactionFormPage />
          </PrivateRoute>
        }
      />
      {/* Rota de Configurações */}
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <SettingsPage />
          </PrivateRoute>
        }
      />
      {/* Rotas de Relatórios */}
      <Route
        path="/reports"
        element={
          <PrivateRoute>
            <ReportsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/reports/new"
        element={
          <PrivateRoute>
            <ReportFormPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/reports/:id"
        element={
          <PrivateRoute>
            <ReportFormPage />
          </PrivateRoute>
        }
      />
      {/* Rotas de Dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      {/* Rotas de Usuários */}
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <UsersPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/users/new"
        element={
          <PrivateRoute>
            <UserFormPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/users/:id"
        element={
          <PrivateRoute>
            <UserFormPage />
          </PrivateRoute>
        }
      />
      {/* Redirecionamento */}
      <Route path="/" element={<Navigate to={sessionStorage.getItem('authToken') ? "/dashboard" : "/login"} />} />
    </Routes>
  );
};

export default AppRoutes;
