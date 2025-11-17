/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

# Sys Aksurim (SA) - Sistema de Gestão para MEIs e Pequenas Empresas

## 1. Visão Geral do Projeto

O **Sys Aksurim (SA)** é um sistema de gestão (ERP) no modelo SaaS (Software as a Service), focado em atender às necessidades de Microempreendedores Individuais (MEIs) e pequenas empresas. A plataforma oferece uma solução completa para a gestão de estoque, vendas (PDV), finanças, e inclui funcionalidades específicas para logística reversa.

O projeto foi construído com uma arquitetura Multi-Tenancy, garantindo que os dados de cada empresa cliente (tenant) sejam isolados e seguros.

## 2. Tecnologias Utilizadas (Stack)

-   **Backend:** Node.js, Express, TypeScript
-   **Frontend:** React, TypeScript, Vite
-   **Banco de Dados:** MySQL
-   **Design e UI:** Tailwind CSS, shadcn/ui
-   **Padrão de Arquitetura:** Controller-Service-Repository (CSR)

## 3. Como Executar o Projeto

### Pré-requisitos

-   Node.js (versão 18 ou superior)
-   npm (ou um gerenciador de pacotes compatível)
-   MySQL (servidor local ou em nuvem)

### Passos para Instalação

1.  **Clonar o Repositório:**
    ```sh
    git clone <URL_DO_REPOSITORIO>
    cd SaaS_aksurim_2
    ```

2.  **Instalar Dependências:**
    Execute o comando abaixo na raiz do projeto para instalar as bibliotecas necessárias para o backend e frontend.
    ```sh
    npm install
    ```

3.  **Configurar Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto, baseado no arquivo `.env.example` (que será criado futuramente). Preencha as variáveis de conexão com o banco de dados, segredos de JWT, etc.

4.  **Executar o Backend:**
    ```sh
    npm run dev:backend 
    ```

5.  **Executar o Frontend:**
    ```sh
    npm run dev:frontend
    ```

Após seguir os passos, a aplicação estará disponível em `http://localhost:5173` (Frontend) e o servidor em `http://localhost:3000` (Backend).

## 4. Estrutura e Padrões

O projeto segue rigorosamente as diretrizes definidas no `DEV_GUIDE.md` e no `Blueprint SaaS Sys Aksurim.md`. A conformidade com as regras de nomenclatura, arquitetura CSR e segurança é mandatória para garantir a qualidade e a manutenibilidade do código.
