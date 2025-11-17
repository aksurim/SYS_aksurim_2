/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import dotenv from 'dotenv';
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

import express from 'express';
import './database/mysql'; // Importa para inicializar a conexão com o BD

// Importação das rotas
import authRouter from './routes/auth.routes';
import customerRouter from './routes/customer.routes';
import supplierRouter from './routes/supplier.routes';
import productRouter from './routes/product.routes';
import saleRouter from './routes/sale.routes';
import accountRouter from './routes/account.routes';
import categoryRouter from './routes/category.routes';
import transactionRouter from './routes/transaction.routes';
import settingsRouter from './routes/settings.routes';
import reportRouter from './routes/report.routes';
import dashboardKpiRouter from './routes/dashboardKpi.routes';
import auditLogRouter from './routes/auditLog.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rotas da aplicação
app.use('/api/auth', authRouter);
app.use('/api/customers', customerRouter);
app.use('/api/suppliers', supplierRouter);
app.use('/api/products', productRouter);
app.use('/api/sales', saleRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/reports', reportRouter);
app.use('/api/dashboard-kpis', dashboardKpiRouter);
app.use('/api/audit-logs', auditLogRouter); // Novas rotas de logs de auditoria

app.get('/', (req, res) => {
  res.send('Servidor Sys Aksurim (SA) está no ar!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
