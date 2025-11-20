# ✅ Checklist de Desenvolvimento - Sys Aksurim (SA)

Este documento rastreia o progresso do desenvolvimento do projeto, garantindo que todos os requisitos do `Blueprint` sejam implementados de forma estruturada.

---

## Fase 1: Estrutura e Configuração do Ambiente

-   [x] Organizar o arquivo `Blueprint SaaS Sys Aksurim.md`.
-   [x] Criar o arquivo `README.md` com a documentação inicial do projeto.
-   [x] Criar o arquivo `Check_list.md` para rastreamento de tarefas.
-   [x] Inicializar o projeto Node.js com `npm init`.
-   [x] Configurar o TypeScript no projeto (`tsconfig.json`).
-   [x] Instalar e configurar o Express.js como framework do servidor.
-   [x] Estruturar as pastas do backend seguindo o padrão Controller-Service-Repository (CSR).
-   [x] Configurar o `ts-node-dev` para reiniciar o servidor automaticamente.
-   [x] Criar o arquivo `.env` e `.env.example` para gerenciamento de variáveis de ambiente.

---

## Fase 2: Módulo de Segurança e Autenticação

-   [x] **Banco de Dados:**
    -   [x] Criar o script SQL (`.sql`) para a tabela `tenants`.
    -   [x] Criar o script SQL para a tabela `users` (com `tenant_id`).
    -   [x] Criar o script SQL para a tabela `permissions`.
-   [x] **Backend:**
    -   [x] Implementar a conexão com o banco de dados MySQL.
    -   [x] Criar a rota, o controller, o service e o repository para o **login de usuário**.
    -   [x] Implementar a geração de token **JWT** no service de login.
    -   [x] Implementar a lógica no service de login para verificar o `subscription_status`.
    -   [x] Criar um **middleware de autenticação** que valide o token JWT.
-   [x] **Frontend:**
    -   [x] Inicializar o projeto React com Vite e TypeScript.
    -   [x] Configurar o Tailwind CSS e o `shadcn/ui`.
    -   [x] Criar a página de Login.
    -   [x] Implementar a chamada de API para o endpoint de login.
    -   [x] Implementar o armazenamento seguro do token JWT no cliente.
    -   [x] Criar um sistema de rotas protegidas.

---

## Fase 3: Cadastros Mestres (CRUDs)

-   [x] **Módulo de Clientes (`customers`):**
    -   [x] BD: Criar script da tabela `customers`.
    -   [x] Backend: Implementar CRUD completo para clientes.
    -   [x] Frontend: Criar e testar a tela de listagem e o formulário de clientes.
-   [x] **Módulo de Fornecedores (`suppliers`):**
    -   [x] BD: Criar script da tabela `suppliers`.
    -   [x] Backend: Implementar CRUD completo para fornecedores.
    -   [x] Frontend: Criar e testar a tela de listagem e o formulário de fornecedores.
---

## Fase 4: Módulo de Produtos, Estoque e Inteligência de Custo

-   [x] **Módulo de Produtos (`products`):**
    -   [x] BD: Criar script da tabela `products`.
    -   [x] BD: Criar script da tabela `recipes`.
    -   [x] BD: Criar script da tabela `product_lr_details`.
    -   [x] Backend: Implementar CRUD completo para produtos.
    -   [x] Frontend: Criar e testar a tela de listagem e o formulário de produtos.
---

## Fase 5: Módulo de Vendas (PDV) e Ordem de Serviço (OS)

-   [x] **Módulo de Vendas (`sales`):**
    -   [x] BD: Criar script da tabela `sales`.
    -   [x] BD: Criar script da tabela `sale_items`.
    -   [x] Backend: Implementar CRUD para vendas.
    -   [x] Frontend: Criar e testar a tela de PDV.
---

## Fase 6: Módulo Financeiro e Relatórios Gerenciais

-   [x] **Módulo Financeiro (`transactions`):**
    -   [x] BD: Criar script da tabela `accounts`.
    -   [x] BD: Criar script da tabela `categories`.
    -   [x] BD: Criar script da tabela `transactions`.
    -   [x] Backend: Implementar CRUD para contas.
    -   [x] Backend: Implementar CRUD para categorias.
    -   [x] Backend: Implementar CRUD para transações.
    -   [x] Frontend: Criar e testar a tela de contas.
    -   [x] Frontend: Criar e testar a tela de categorias.
    -   [x] Frontend: Criar e testar a tela de transações.

---

## Fase 7: Módulo de Configurações e Cadastros Mestres

-   [x] **Módulo de Configurações (`settings`):**
    -   [x] BD: Criar script da tabela `settings`.
    -   [x] Backend: Implementar CRUD para configurações.
    -   [x] Frontend: Criar e testar a tela de configurações.

---

## Fase 8: Módulo de Relatórios Gerenciais

-   [x] **Módulo de Relatórios (`reports`):**
    -   [x] BD: Criar script da tabela `reports`.
    -   [x] BD: Criar script da tabela `report_filters`.
    -   [x] Backend: Implementar CRUD para **definições** de relatórios.
    -   [x] Frontend: Criar e testar a tela de **definições** de relatórios.
-   [ ] **Melhoria (Relatórios):** Implementar a **execução** de relatórios com interface intuitiva (filtros dinâmicos e visualização de dados).

---

## Fase 9: Módulo de Dashboard

-   [x] **Módulo de Dashboard (`dashboard_kpis`):**
    -   [x] BD: Criar script da tabela `dashboard_kpis`.
    -   [x] Backend: Implementar CRUD (mockado) para KPIs do dashboard.
    -   [x] Frontend: Criar e testar a tela do dashboard.
-   [ ] **Melhoria (Dashboard):** Implementar a lógica real de **cálculo** dos KPIs no backend.

---

## Fase 10: Módulo de Usuários

-   [ ] **Módulo de Usuários (`users_permissions`):**
    -   [x] BD: Criar script da tabela `users_permissions`.
    -   [x] Backend: Implementar CRUD para usuários e permissões.
    -   [ ] Frontend: Criar e testar a tela de gerenciamento de usuários e permissões. *(Código gerado, mas não testado)*

---

## Fase 11: Módulo de Log de Auditoria

-   [ ] **Módulo de Log de Auditoria (`audit_logs`):**
    -   [x] BD: Criar script da tabela `audit_logs`.
    -   [x] Backend: Implementar CRUD para logs de auditoria.
    -   [ ] Frontend: Criar e testar a tela de logs de auditoria. *(Código gerado, mas não testado)*

---

## Fase 12: Módulo de Notificações

-   [ ] **Módulo de Notificações (`notifications`):**
    -   [x] BD: Criar script da tabela `notifications`.
    -   [x] Backend: Implementar CRUD para notificações.
    -   [ ] Frontend: Criar e testar a tela de notificações. *(Código gerado, mas não testado)*

---

## Fase 13: Módulo de Assinatura e Faturamento

-   [ ] **Módulo de Assinatura (`subscriptions`):**
    -   [x] BD: Criar script da tabela `subscriptions`.
    -   [x] Backend: Implementar CRUD para assinaturas.
    -   [ ] Frontend: Criar e testar a tela de assinaturas. *(Código gerado, mas não testado)*

---

## Fase 14: Módulo de Integrações

-   [ ] **Módulo de Integrações (`integrations`):**
    -   [x] BD: Criar script da tabela `integrations`.
    -   [x] Backend: Implementar CRUD para integrações.
    -   [ ] Frontend: Criar e testar a tela de integrações. *(Código gerado, mas não testado)*

---

## Fase 15: Módulo de Notificações por Email/SMS

-   [ ] **Módulo de Notificações por Email/SMS (`notification_templates`):**
    -   [x] BD: Criar script da tabela `notification_templates`.
    -   [x] Backend: Implementar CRUD para templates de notificação.
    -   [ ] Frontend: Criar e testar a tela de templates de notificação. *(Código gerado, mas não testado)*

---

## Fase 16: Módulo de Gestão de Estoque

-   [ ] **Módulo de Gestão de Estoque (`stock_movements`):**
    -   [x] BD: Criar script da tabela `stock_movements`.
    -   [x] Backend: Implementar CRUD para movimentações de estoque.
    -   [ ] Frontend: Criar e testar a tela de movimentações de estoque. *(Código gerado, mas não testado)*

---

## Fase 17: Módulo de Gestão de Compras

-   [ ] **Módulo de Gestão de Compras (`purchases`):**
    -   [x] BD: Criar script da tabela `purchases`.
    -   [x] BD: Criar script da tabela `purchase_items`.
    -   [x] Backend: Implementar CRUD para compras.
    -   [ ] Frontend: Criar e testar a tela de compras. *(Código gerado, mas não testado)*

---

## Fase 18: Módulo de Gestão de Vendas Recorrentes

-   [ ] **Módulo de Gestão de Vendas Recorrentes (`recurring_sales`):**
    -   [x] BD: Criar script da tabela `recurring_sales`.
    -   [x] Backend: Implementar CRUD para vendas recorrentes.
    -   [ ] Frontend: Criar e testar a tela de vendas recorrentes. *(Código gerado, mas não testado)*

---

## Fase 19: Módulo de Gestão de Tarefas

-   [ ] **Módulo de Gestão de Tarefas (`tasks`):**
    -   [x] BD: Criar script da tabela `tasks`.
    -   [x] Backend: Implementar CRUD para tarefas.
    -   [ ] Frontend: Criar e testar a tela de tarefas. *(Código gerado, mas não testado)*

---

## Fase 20: Módulo de Gestão de Documentos

-   [ ] **Módulo de Gestão de Documentos (`documents`):**
    -   [x] BD: Criar script da tabela `documents`.
    -   [x] Backend: Implementar CRUD para documentos.
    -   [ ] Frontend: Criar e testar a tela de documentos. *(Código gerado, mas não testado)*

---

## Fase 21: Módulo de Gestão de Projetos

-   [ ] **Módulo de Gestão de Projetos (`projects`):**
    -   [x] BD: Criar script da tabela `projects`.
    -   [x] Backend: Implementar CRUD para projetos.
    -   [ ] Frontend: Criar e testar a tela de projetos. *(Código gerado, mas não testado)*

---

## Fase 22: Módulo de Comunicação Interna

-   [ ] **Módulo de Comunicação Interna (`messages`):**
    -   [x] BD: Criar script da tabela `messages`.
    -   [x] Backend: Implementar CRUD para mensagens.
    -   [ ] Frontend: Criar e testar a tela de mensagens. *(Código gerado, mas não testado)*

---

## Fase 23: Módulo de Automação e Workflows

-   [ ] **Módulo de Automação e Workflows (`workflows`):**
    -   [x] BD: Criar script da tabela `workflows`.
    -   [x] Backend: Implementar CRUD para workflows.
    -   [ ] Frontend: Criar e testar a tela de workflows. *(Código gerado, mas não testado)*

---

## Fase 24: Módulo de Relatórios Personalizados

-   [ ] **Módulo de Relatórios Personalizados (`custom_reports`):**
    -   [x] BD: Criar script da tabela `custom_reports`.
    -   [x] Backend: Implementar CRUD para relatórios personalizados.
    -   [ ] Frontend: Criar e testar a tela de relatórios personalizados. *(Código gerado, mas não testado)*

---

## Fase 25: Módulo de Gestão de Recursos Humanos

-   [ ] **Módulo de Gestão de Recursos Humanos (`employees`):**
    -   [x] BD: Criar script da tabela `employees`.
    -   [x] Backend: Implementar CRUD para funcionários.
    -   [ ] Frontend: Criar e testar a tela de funcionários. *(Código gerado, mas não testado)*

---

## Fase 26: Módulo de Gestão de Ativos

-   [ ] **Módulo de Gestão de Ativos (`assets`):**
    -   [x] BD: Criar script da tabela `assets`.
    -   [x] Backend: Implementar CRUD para ativos.
    -   [ ] Frontend: Criar e testar a tela de ativos. *(Código gerado, mas não testado)*

---

## Fase 27: Módulo de Gestão de Contratos

-   [ ] **Módulo de Gestão de Contratos (`contracts`):**
    -   [x] BD: Criar script da tabela `contracts`.
    -   [x] Backend: Implementar CRUD para contratos.
    -   [ ] Frontend: Criar e testar a tela de contratos. *(Código gerado, mas não testado)*

---

## Fase 28: Módulo de Gestão de Marketing

-   [ ] **Módulo de Marketing (`campaigns`):**
    -   [x] BD: Criar script da tabela `campaigns`.
    -   [x] Backend: Implementar CRUD para campanhas.
    -   [ ] Frontend: Criar e testar a tela de campanhas. *(Código gerado, mas não testado)*

---

## Fase 29: Módulo de Gestão de Leads

-   [ ] **Módulo de Gestão de Leads (`leads`):**
    -   [x] BD: Criar script da tabela `leads`.
    -   [x] Backend: Implementar CRUD para leads.
    -   [ ] Frontend: Criar e testar a tela de leads. *(Código gerado, mas não testado)*

---

## Fase 30: Módulo de Gestão de Suporte ao Cliente

-   [ ] **Módulo de Suporte (`tickets`):**
    -   [x] BD: Criar script da tabela `tickets`.
    -   [x] Backend: Implementar CRUD para tickets.
    -   [ ] Frontend: Criar e testar a tela de tickets. *(Código gerado, mas não testado)*

---

## Fase 31: Módulo de Gestão de Frotas

-   [ ] **Módulo de Frotas (`vehicles`):**
    -   [x] BD: Criar script da tabela `vehicles`.
    -   [x] Backend: Implementar CRUD para veículos.
    -   [ ] Frontend: Criar e testar a tela de veículos. *(Código gerado, mas não testado)*

---

## Fase 32: Módulo de Gestão de Eventos

-   [ ] **Módulo de Eventos (`events`):**
    -   [x] BD: Criar script da tabela `events`.
    -   [x] Backend: Implementar CRUD para eventos.
    -   [ ] Frontend: Criar e testar a tela de eventos. *(Código gerado, mas não testado)*

---

## Fase 33: Módulo de Gestão de Recursos

-   [ ] **Módulo de Recursos (`resources`):**
    -   [x] BD: Criar script da tabela `resources`.
    -   [x] Backend: Implementar CRUD para recursos.
    -   [ ] Frontend: Criar e testar a tela de recursos. *(Código gerado, mas não testado)*

---

## Fase 34: Módulo de Gestão de Conhecimento

-   [ ] **Módulo de Conhecimento (`knowledge_base_articles`):**
    -   [x] BD: Criar script da tabela `knowledge_base_articles`.
    -   [x] Backend: Implementar CRUD para artigos da base de conhecimento.
    -   [ ] Frontend: Criar e testar a tela de artigos da base de conhecimento. *(Código gerado, mas não testado)*

---

## Fase 35: Módulo de Gestão de Metas e OKRs

-   [ ] **Módulo de Metas e OKRs (`goals`):**
    -   [x] BD: Criar script da tabela `goals`.
    -   [x] Backend: Implementar CRUD para metas e OKRs.
    -   [ ] Frontend: Criar e testar a tela de metas e OKRs. *(Código gerado, mas não testado)*

---

## Fase 36: Módulo de Gestão de Feedback

-   [ ] **Módulo de Feedback (`feedback`):**
    -   [x] BD: Criar script da tabela `feedback`.
    -   [x] Backend: Implementar CRUD para feedback.
    -   [ ] Frontend: Criar e testar a tela de feedback. *(Código gerado, mas não testado)*

---

## Fase 37: Módulo de Gestão de Processos

-   [ ] **Módulo de Processos (`processes`):**
    -   [x] BD: Criar script da tabela `processes`.
    -   [x] Backend: Implementar CRUD para processos.
    -   [ ] Frontend: Criar e testar a tela de processos. *(Código gerado, mas não testado)*
