# Changelog - Sys Aksurim (SA)

Este documento registra o histórico de alterações e o planejamento de futuras implementações do projeto.

---

## [Unreleased] - Planejamento

### Próximos Passos
- [ ] **Fase 10 - Usuários:** Testar o CRUD da tela de gerenciamento de Usuários e Permissões.
- [ ] **Melhoria (Dashboard):** Implementar a lógica real de **cálculo** dos KPIs no backend.
- [ ] **Melhoria (Relatórios):** Implementar a **execução** de relatórios com interface intuitiva (filtros dinâmicos e visualização de dados).
- [ ] **Melhoria (UI/UX):** Implementar a tradução e formatação de dados nas tabelas (ex: `product_type`, `category_type`, datas) para garantir que a interface seja exibida 100% em PT-BR e de forma amigável.
- [ ] ... (demais fases a serem testadas sequencialmente).

---

## [v0.9.0] - 2025-11-18

### Corrigido (Fixed)
- **Dashboard (DB):** Adicionada a definição da tabela `dashboard_kpis` ao `schema.sql` principal.
- **Dashboard (Backend):** O `DashboardKpiService` foi refatorado para retornar dados mockados, permitindo a validação da interface e contornando a ausência da lógica de cálculo de KPIs.

### Testado (Tested)
- **Fase 9 - Dashboard (Frontend):** A tela do Dashboard foi reativada e testada, exibindo corretamente os dados mockados.

---

## [v0.8.0] - 2025-11-18

### Corrigido (Fixed)
- **Relatórios (DB):** Adicionada a definição das tabelas `reports` e `report_filters` ao `schema.sql` principal.
- **Relatórios (Frontend):** Corrigido o bug que causava erro na visualização de relatórios sem filtros.
- **Relatórios (Backend):** Corrigida a inconsistência no nome da coluna de filtros (`filter_key` vs `filter_name`) entre o frontend e o banco de dados.
- **Relatórios (Backend):** Corrigido o método `findById` para carregar os filtros salvos ao visualizar um relatório.

### Testado (Tested)
- **Fase 8 - Relatórios (Frontend):** O CRUD completo para as **definições** de relatórios foi testado e validado.

---

## [v0.7.0] - 2025-11-18

### Corrigido (Fixed)
- **Configurações (DB):** Adicionada a definição da tabela `settings` ao `schema.sql` principal.
- **Configurações (Backend):** Aplicada a sanitização de dados no método de atualização para prevenir o bug de alteração de campos de controle.

### Testado (Tested)
- **Fase 7 - Configurações (Frontend):** O CRUD completo da tela de Configurações foi testado e validado.

---

## [v0.6.0] - 2025-11-18

### Corrigido (Fixed)
- **Backend (Segurança):** Realizada uma sanitização proativa em todos os métodos `update` dos serviços (`Customer`, `Supplier`, `Product`, `Account`, `Category`, `Transaction`) para prevenir a modificação de campos de controle (como `created_at`), resolvendo o bug crítico na alteração de transações.

### Melhorado (Improved)
- **Frontend (UX):** Na tela de Transações, a data agora é exibida no formato `DD/MM/AAAA` e o valor é formatado como moeda (R$), melhorando a legibilidade.

### Testado (Tested)
- **Fase 6 - Financeiro (Frontend):** O CRUD completo para os módulos de Contas, Categorias e Transações foi testado e validado.

---

## [v0.5.0] - 2025-11-18

### Testado (Tested)
- **Fase 5 - Vendas (PDV):** A funcionalidade completa do Ponto de Venda foi testada e validada, incluindo adição de produtos, gestão do carrinho e finalização da venda.

---

## [v0.4.0] - 2025-11-18

### Testado (Tested)
- **Fase 4 - Produtos (Frontend):** O CRUD completo para o módulo de Produtos foi testado e validado no frontend, incluindo listagem, criação, edição e exclusão.

---

## [v0.3.0] - 2025-11-18

### Corrigido (Fixed)
- **Dashboard:** Desabilitada temporariamente a busca por KPIs no Dashboard para contornar o erro de tabela (`dashboard_kpis`) inexistente e permitir a navegação na aplicação.

### Testado (Tested)
- **Fase 3 - Clientes (Frontend):** O CRUD completo para o módulo de Clientes foi testado e validado no frontend, incluindo listagem, criação, edição e exclusão.
- **Fase 3 - Fornecedores (Frontend):** O CRUD completo para o módulo de Fornecedores foi testado e validado no frontend, incluindo listagem, criação, edição e exclusão.

---

## [v0.2.0] - 2025-11-17

### Corrigido (Fixed)
- **Sincronização do Projeto:** O `schema.sql` foi completamente reescrito para remover todas as tabelas que não estavam no `Blueprint` original, alinhando o banco de dados com o escopo definido.
- **Documentação:** O `Check_list.md` foi corrigido para refletir o estado real do projeto, marcando apenas a Fase 2 como 100% concluída e as demais como pendentes de teste.
- **Autenticação:** Criado um novo usuário de teste após a limpeza do banco de dados para permitir a continuidade do desenvolvimento.

### Adicionado (Added)
- **Ferramentas:** Criado o script `hash-generator.js` para facilitar a criação de senhas para novos usuários.
- **Documentação:** Adicionada a regra "Protocolo de Versionamento e Changelog" ao `DEV_GUIDE.md`.

### Testado (Tested)
- **Fase 3 - Clientes (Backend):** O CRUD completo para o módulo de Clientes foi testado e validado via API.

---

## [v0.1.0] - 2025-11-16

### Adicionado
- **Estrutura Completa do Projeto (Fases 1-37):**
  - Criação de todas as tabelas do banco de dados no arquivo `schema.sql`.
  - Geração de todo o código base para o backend (Repositories, Services, Controllers, Rotas) para todos os módulos.
  - Geração de todo o código base para o frontend (Páginas de Listagem e Formulários, com rotas configuradas) para todos os módulos.
- **Fase 2 (Segurança e Autenticação):** Módulo completamente implementado e validado.
- **Documentação:** Criação dos arquivos `README.md`, `DEV_GUIDE.md` e `Check_list.md`.
