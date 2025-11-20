/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

-- ====================================================================================
-- ARQUIVO DE SCHEMA DO BANCO DE DADOS - SYS AKSURIM (SA)
-- Este arquivo contém a estrutura oficial e documentada de todas as tabelas.
-- ====================================================================================

-- ------------------------------------------------------------------------------------
-- FASE 2: MÓDULO DE SEGURANÇA E AUTENTICAÇÃO
-- ------------------------------------------------------------------------------------

-- Tabela `tenants`: Armazena as informações de cada empresa/cliente (tenant) que utiliza o sistema.
-- É a tabela central para a arquitetura multi-tenant.
CREATE TABLE IF NOT EXISTS `tenants` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `company_name` VARCHAR(255) NOT NULL,
    `subscription_status` VARCHAR(50) NOT NULL DEFAULT 'active', -- Ex: active, past_due, canceled
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabela `users`: Armazena os usuários que podem acessar o sistema, vinculados a um `tenant`.
-- Contém as credenciais de login e o nível de acesso (role).
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL, -- Armazenar sempre o hash da senha
    `role` VARCHAR(50) NOT NULL DEFAULT 'user', -- Ex: 'admin', 'user'
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `unique_email_per_tenant` (`tenant_id`, `email`),
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Tabela `permissions`: Define permissões granulares para funcionalidades específicas do sistema.
-- Atualmente, está como placeholder para futuras implementações de controle de acesso baseado em políticas (PBAC).
CREATE TABLE IF NOT EXISTS `permissions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `feature_key` VARCHAR(100) NOT NULL, -- Ex: 'dashboard:financial_kpis', 'stock:edit_cost'
    `can_view` BOOLEAN NOT NULL DEFAULT false,
    `can_create` BOOLEAN NOT NULL DEFAULT false,
    `can_edit` BOOLEAN NOT NULL DEFAULT false,
    `can_delete` BOOLEAN NOT NULL DEFAULT false,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `unique_permission_per_user` (`user_id`, `feature_key`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------------
-- FASE 3: CADASTROS MESTRES (CRUDS)
-- ------------------------------------------------------------------------------------

-- Tabela `customers`: Armazena a carteira de clientes de cada tenant.
-- Essencial para vendas, relatórios e KPIs de marketing.
CREATE TABLE IF NOT EXISTS `customers` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `document` VARCHAR(20) NULL, -- CPF ou CNPJ
    `email` VARCHAR(255) NULL,
    `phone` VARCHAR(20) NULL,
    `birth_date` DATE NULL,
    `address` VARCHAR(255) NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Tabela `suppliers`: Armazena os fornecedores de cada tenant.
-- Utilizada para o módulo de compras e controle de custos.
CREATE TABLE IF NOT EXISTS `suppliers` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `document` VARCHAR(20) NULL, -- CNPJ
    `email` VARCHAR(255) NULL,
    `phone` VARCHAR(20) NULL,
    `address` VARCHAR(255) NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------------
-- FASE 4: MÓDULO DE PRODUTOS, ESTOQUE E INTELIGÊNCIA DE CUSTO
-- ------------------------------------------------------------------------------------

-- Tabela `products`: Armazena os produtos e serviços oferecidos pelo tenant.
-- Base para vendas, controle de estoque e cálculo de custos.
CREATE TABLE IF NOT EXISTS `products` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `cost` DECIMAL(10, 2) NULL,
    `product_type` ENUM('FinishedGood', 'RawMaterial', 'Service') NOT NULL,
    `is_reverse_logistics` BOOLEAN NOT NULL DEFAULT false,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Tabela `recipes`: Descreve a composição de produtos acabados (kits), listando as matérias-primas e suas quantidades.
-- Essencial para o cálculo de custo e baixa automática de estoque.
CREATE TABLE IF NOT EXISTS `recipes` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT NOT NULL,
    `finished_good_id` INT NOT NULL,
    `raw_material_id` INT NOT NULL,
    `quantity_needed` DECIMAL(10, 3) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`finished_good_id`) REFERENCES `products`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`raw_material_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Tabela `product_lr_details`: Armazena detalhes específicos para produtos que utilizam logística reversa (ex: volume de embalagem).
CREATE TABLE IF NOT EXISTS `product_lr_details` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    `volume` DECIMAL(10, 3) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------------
-- FASE 5: MÓDULO DE VENDAS (PDV) E ORDEM DE SERVIÇO (OS)
-- ------------------------------------------------------------------------------------

-- Tabela `sales`: Registra o cabeçalho de cada venda ou ordem de serviço.
-- Contém o valor total, cliente e vendedor associado.
CREATE TABLE IF NOT EXISTS `sales` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT NOT NULL,
    `customer_id` INT NULL,
    `user_id` INT NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    `discount` DECIMAL(10, 2) NULL,
    `shipping_cost` DECIMAL(10, 2) NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- Tabela `sale_items`: Registra os produtos/serviços específicos de cada venda.
-- Detalha a quantidade e o preço de cada item vendido.
CREATE TABLE IF NOT EXISTS `sale_items` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT NOT NULL,
    `sale_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    `quantity` INT NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`sale_id`) REFERENCES `sales`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------------
-- FASE 6: MÓDULO FINANCEIRO E RELATÓRIOS GERENCIAIS
-- ------------------------------------------------------------------------------------

-- Tabela `accounts`: Armazena as contas financeiras (bancos, caixas) de cada tenant.
-- Utilizada para controle de saldo e fluxo de caixa.
CREATE TABLE IF NOT EXISTS `accounts` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `balance` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Tabela `categories`: Armazena as categorias de transações (receitas e despesas) de cada tenant.
-- Utilizada para classificar as movimentações financeiras e gerar relatórios (DRE).
CREATE TABLE IF NOT EXISTS `categories` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `type` ENUM('income', 'expense') NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Tabela `transactions`: Registra todas as movimentações financeiras (entradas e saídas) de cada tenant.
-- É a base para o fluxo de caixa, DRE e outros relatórios financeiros.
CREATE TABLE IF NOT EXISTS `transactions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT NOT NULL,
    `account_id` INT NOT NULL,
    `category_id` INT NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `type` ENUM('income', 'expense') NOT NULL,
    `date` DATE NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------------
-- FASE 7: MÓDULO DE CONFIGURAÇÕES E CADASTROS MESTRES
-- ------------------------------------------------------------------------------------

-- Tabela `settings`: Armazena as configurações gerais de cada tenant (nome da empresa, logo, etc.).
-- Cada tenant possui apenas uma linha nesta tabela.
CREATE TABLE IF NOT EXISTS `settings` (
    `tenant_id` INT NOT NULL PRIMARY KEY,
    `company_name` VARCHAR(255) NULL,
    `logo_url` VARCHAR(255) NULL,
    `instagram` VARCHAR(100) NULL,
    `contact` VARCHAR(100) NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------------
-- FASE 8: MÓDULO DE RELATÓRIOS GERENCIAIS
-- ------------------------------------------------------------------------------------

-- Tabela `reports`: Armazena a definição de relatórios personalizados para cada tenant.
CREATE TABLE IF NOT EXISTS `reports` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `type` VARCHAR(100) NOT NULL, -- Ex: 'sales_by_period', 'stock_summary'
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Tabela `report_filters`: Armazena os filtros associados a um relatório personalizado.
CREATE TABLE IF NOT EXISTS `report_filters` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT NOT NULL,
    `report_id` INT NOT NULL,
    `filter_name` VARCHAR(100) NOT NULL, -- Ex: 'start_date', 'end_date', 'product_id'
    `filter_value` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`report_id`) REFERENCES `reports`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------------
-- FASE 9: MÓDULO DE DASHBOARD
-- ------------------------------------------------------------------------------------

-- Tabela `dashboard_kpis`: Armazena as preferências de visibilidade de cada KPI para cada usuário.
CREATE TABLE IF NOT EXISTS `dashboard_kpis` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `kpi_key` VARCHAR(100) NOT NULL, -- Ex: 'net_profit', 'daily_revenue'
    `is_visible` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `unique_kpi_per_user` (`user_id`, `kpi_key`),
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;
