# Changelog - Sys Aksurim (SA)

Este documento registra o histórico de alterações e o planejamento de futuras implementações do projeto.

---

## [Unreleased] - Planejamento

### Próximos Passos
- [ ] **Fase 3 - Clientes:** Testar o CRUD completo de Clientes no frontend (Listagem, Criação, Edição e Exclusão).
- [ ] **Fase 3 - Fornecedores:** Testar o CRUD completo de Fornecedores no backend e frontend.
- [ ] ... (demais fases a serem testadas sequencialmente).

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
