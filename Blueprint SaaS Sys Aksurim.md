# 📘 Blueprint: Sistema SaaS Sys Aksurim (SA)

## 1. Visão Geral e Arquitetura Crítica 🏗️

| Item | Detalhes | Requisito Arquitetural Crítico |
|---|---|---|
| **Nome do Projeto** | Sys Aksurim (SA) | Multi-Tenancy Obrigatória em todas as tabelas transacionais (`tenant_id` FK). |
| **Foco** | MEIs e Pequenas Empresas (Gestão Completa de Estoque, Vendas, Financeiro). | Segurança: Service Layer deve OBRIGATORIAMENTE filtrar todos os dados usando o `tenant_id` do usuário logado (JWT). |
| **Stack Backend** | Node.js, Express, TypeScript | Padrão: Controller-Service-Repository (CSR). |
| **Stack Frontend** | React, TypeScript, Vite | Design: Tailwind CSS + shadcn/ui (obrigatório para componentes e layout). |
| **Banco de Dados** | MySQL | Design para Transações (OLTP). |

## 2. Módulo de Segurança e Autenticação (Acesso & Autorização) 🔒

| Feature | Detalhamento da Lógica | Camadas Afetadas |
|---|---|---|
| **Autenticação (JWT)** | Login/Logout e controle de sessão via JSON Web Tokens. | Backend Middleware |
| **Controle de Assinatura** | O fluxo de Login deve consultar uma API Externa de Billing para verificar o `subscription_status` do tenant (PastDue, Cancelled) antes de conceder acesso. | Backend Service (Login) |
| **Permissões Granulares (PBAC)** | Tabela `permissions`: Armazenar `feature_key` (dashboard:financial_kpis, stock:edit_cost) com flags `can_view`/`can_create`/etc. por `user_id`. | Backend Service (Autorização) & Frontend |
| **Limitação de Acesso** | Frontend: Componente `PermissionWrapper` oculta elementos (ex: Card de Lucro). Backend: Service Layer filtra/retorna dados zerados se o usuário não tiver permissão de visualização. | Todas as Camadas |

## 3. Módulo de Configurações e Cadastros Mestres ⚙️

| Entidade | Colunas Críticas | Funções de UX/Regra de Negócios |
|---|---|---|
| **settings** | `company_name`, `logo_url`, `instagram`, `contact`. | Configuração Dinâmica: Permite personalização do sistema e documentos sem deploy. |
| **users** | `tenant_id`, `email`, `role`, `permissions` (relacionamento). | Frontend: Tela de Usuários com Checkbox de Permissões individuais. |
| **customers** | `tenant_id`, `name`, `document`, `birth_date` (DATE). | CRM: Suporte ao Card de Aniversariantes no Dashboard. |
| **suppliers** | `tenant_id`, `name`, `document`. | UX: Botão na tela de fornecedores para acesso rápido ao Histórico de Contas a Pagar e pendências. |
| **lr_categories** | `name`, `unit_type` (KG/LITERS), `market_price` (Cotação de LR). | Define o tipo de material de Logística Reversa e seu valor de mercado para venda. |
| **Fin. (Geral)** | Cadastro de Bancos/Contas, Categorias (Despesa/Receita), Taxas de Maquininha. | Base para DRE e Conciliação Financeira. |

## 4. Módulo de Produtos, Estoque e Inteligência de Custo 📦

| Feature | Detalhamento da Lógica | Lançamentos Automáticos |
|---|---|---|
| **Tipos de Produto** | `products` deve ter `product_type`: FinishedGood (Kit/Revenda), RawMaterial (Insumo), Service. | N/A |
| **Kits/Receitas** | Tabela `recipes`: Vínculo de FinishedGood com N RawMaterial e `quantity_needed`. | Venda: Baixa automática de estoque de Insumos na `stock_movement`. |
| **Logística Reversa** | `products` deve ter `is_reverse_logistics` e relacionamento com `product_lr_details` (volume obrigatório). | Compra: Aumenta o Débito de LR (`supplier_lr_debit`) na compra. |
| **Formação de Preço** | Service Layer: O Custo Total de Aquisição do produto deve ser calculado, incluindo Frete e Impostos rateados da compra. | N/A |
| **Cálculo de Markup** | Configurações: O gestor cadastra Custos Fixos Mensais e Taxa de Custos Variáveis. | Service Layer: Sugestão de Preço de Venda ideal no cadastro do produto com base no Custo Total e Markup. |

## 5. Módulo de Vendas (PDV) e Ordem de Serviço (OS) 🛒

| Feature | Requisitos de UX/Front | Lógica de Service Layer |
|---|---|---|
| **PDV (Geral)** | Campo de Busca aceita Nome/Descrição e Código de Barras (EAN-13). | Registrar Frete (`shipping_cost`) e Comissionamento (`professional_id`). |
| **Desconto** | Permite aplicação de desconto em % ou R$ (Valor Fixo). | Calcular e registrar o desconto total; só exibir o % no comprovante se aplicado. |
| **Logística Reversa** | No PDV, ao vender um produto LR, campo para input do Volume Coletado. Alerta vermelho se o volume for menor que o `required_volume`. | Lançar o Volume Coletado (Crédito) na `stock_movement` como `LR_Collection_In`. |
| **Crediário** | Seleção da Forma de Pagamento com parcelamento. | Lógica de Parcelas: Gerar N registros de Contas a Receber com vencimentos futuros. |
| **Serviços (OS)** | Vendas com rastreio de Profissional e Previsão/Status do serviço. | Lançar o valor da comissão na Contas a Pagar. |
| **Venda de LR** | Uso do PDV padrão para vender o estoque de LR (utilizando o `market_price` da `lr_categories`). | Gerar receita no caixa e baixa na `stock_movement` como `LR_Sale_Out`. |

## 6. Módulo Financeiro e Relatórios Gerenciais 💰

| Módulo | Funcionalidades Obrigatórias | Detalhes de Relatório |
|---|---|---|
| **Contas a Receber/Pagar** | Geração automática (Vendas/Compras); Lançamento avulso; Recibo de Quitação (Térmico/PDF). | Filtros avançados por Vencimento, Status, Cliente/Fornecedor. |
| **Despesas Recorrentes** | Cadastro de Despesas Fixas (Aluguel, Salário) com geração automática de lançamentos futuros no CP. | N/A |
| **Dashboard KPIs** | Lucro Líquido, Contas A Pagar/Receber do Dia, Aniversariantes do Dia/Mês. | UX: Visibilidade dos Cards controlada pelo usuário via `settings`. |
| **Relatórios de LR** | 1. Débito por Fornecedor: Saldo devedor total por fornecedor/categoria. <br> 2. Estoque de LR Coletada: Volume/Peso físico em estoque. | Essenciais para compliance e tomada de decisão de negociação/venda de LR. |
| **Relatórios Padrão** | DRE, Fluxo de Caixa Diário/Mensal, Vendas por Período/Produto/Vendedor. | PDFs padronizados (Cabeçalho/Rodapé dinâmico) e Recibos em formato térmico. |
| **Log de Auditoria** | Registro de atividades (CRUDs) usando o Código de Cliente/Produto (ID amigável) em vez de ID interno. | Rastreabilidade aprimorada. |
