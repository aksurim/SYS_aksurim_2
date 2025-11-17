/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

# Diretrizes de Desenvolvimento e Ambiente

Este documento serve como um guia interno para o agente de codificação e para o desenvolvedor, contendo notas importantes, padrões e soluções para problemas comuns encontrados durante o desenvolvimento do projeto Sys Aksurim.

## 1. Testes de API com cURL no Windows PowerShell

**Problema:** O comando `curl` padrão, frequentemente usado em exemplos de documentação, não funciona como esperado no PowerShell do Windows. Isso ocorre porque `curl` no PowerShell é um *alias* (apelido) para o cmdlet `Invoke-WebRequest`, que possui uma sintaxe diferente.

**Solução:** Ao testar a API via linha de comando no Windows, os comandos devem ser adaptados da seguinte forma:

*   **Método HTTP:** Em vez de `-X POST`, use `-Method POST`.
*   **Cabeçalhos (Headers):** Em vez de `-H "Chave: Valor"`, use `-Headers @{"Chave"="Valor"}`.
*   **Corpo da Requisição (Body):** Em vez de `-d '{"json": "aqui"}'`, use `-Body '{"json": "aqui"}'`.
*   **URI:** É uma boa prática usar o parâmetro `-Uri` para especificar a URL.

**Exemplo de um comando `POST` correto:**
```powershell
curl -Method POST -Uri http://localhost:3000/api/auth/login -Headers @{"Content-Type"="application/json"} -Body '{"email": "admin@aksurim.com", "password": "admin"}'
```

**Recomendação:** Para evitar problemas de sintaxe entre diferentes terminais, o uso de uma ferramenta de cliente de API gráfica como **Postman** ou **Insomnia** é fortemente recomendado para os testes.

## 2. Instalação de Dependências

**Lembrete:** Antes de executar o projeto pela primeira vez ou após a adição de novas bibliotecas, é crucial instalar as dependências do Node.js com o comando:
```sh
npm install
```
A ausência de dependências resulta no erro `Error: Cannot find module '...'`.

## 3. Sincronização de Documentação e Tarefas (Regra Organizacional)

**Objetivo:** Manter a documentação do projeto sempre alinhada com o estado atual do desenvolvimento para garantir clareza, rastreabilidade e consistência.

**Processo Obrigatório:**
1.  **Antes de Implementar:** Qualquer nova funcionalidade, alteração de arquitetura ou melhoria discutida deve ser primeiro validada contra o `Blueprint SaaS Sys Aksurim.md`. Se a mudança for aprovada e impactar o escopo original, o `Blueprint` **deve ser atualizado antes** da codificação.
2.  **Durante a Implementação:** O arquivo `Check_list.md` deve ser usado como um guia de "tarefas a fazer". Ao concluir uma tarefa, marque-a como feita (`[x]`). Se a implementação exigir novos passos não previstos, eles devem ser adicionados ao checklist.
3.  **Após a Implementação:** Se um novo padrão, ferramenta ou solução for estabelecido durante o desenvolvimento (ex: um novo script no `package.json`, uma nova biblioteca padrão), este arquivo (`DEV_GUIDE.md`) deve ser atualizado para refletir a nova prática.

Este ciclo de **Documentar -> Implementar -> Atualizar** é mandatório para manter a organização e a qualidade do projeto.

## 4. Fluxo de Interação e Confirmação (Agente-Desenvolvedor)

**Objetivo:** Garantir um desenvolvimento síncrono e evitar desalinhamentos entre as ações do agente de codificação e as ações manuais do desenvolvedor.

**Regra Mandatória:**
- **Pausa para Confirmação:** Sempre que o agente de codificação solicitar uma ação manual ao desenvolvedor (ex: `npm install`, executar um script SQL, configurar variáveis de ambiente), o agente deve **PARAR** e aguardar a confirmação explícita do desenvolvedor no chat antes de prosseguir para a próxima etapa. Isso garante que o ambiente esteja sempre no estado esperado.
- **Trabalho em Fases:** O desenvolvimento deve seguir uma abordagem estritamente faseada. Um novo módulo ou funcionalidade só deve ser iniciado após a conclusão e **teste** do anterior. O agente não deve avançar para novas implementações sem a validação explícita do desenvolvedor.

## 5. Resolução de Conflitos de Módulos (CommonJS vs. ES Modules)

**Problema:** Em projetos frontend modernos (como React com Vite) que usam `"type": "module"` no `package.json`, arquivos de configuração como `tailwind.config.js` e `postcss.config.js` podem gerar erros (`ReferenceError: module is not defined`) se tentarem usar a sintaxe `module.exports` (CommonJS).

**Solução:** Para resolver este conflito, renomeie os arquivos de configuração que usam `module.exports` para a extensão `.cjs`. Isso instrui o Node.js a tratá-los como módulos CommonJS, mesmo em um projeto ES Module.

**Exemplo:**
- Renomear `tailwind.config.js` para `tailwind.config.cjs`.
- Renomear `postcss.config.js` para `postcss.config.cjs`.

**Importante:** Se houver referências a esses arquivos em outros locais (ex: `components.json`), elas também precisarão ser atualizadas para o novo nome (`.cjs`).

## 6. Formatação de Comandos e Blocos de Código

**Objetivo:** Garantir que todos os comandos e blocos de código fornecidos pelo agente sejam claros, completos e prontos para uso.

**Regra Mandatória:**
- **Código Completo e Testado:** O agente deve fornecer blocos de código e comandos `curl` completos, sem quebras ou artefatos de formatação. Para comandos `curl` no PowerShell, o agente deve montar o comando completo, incluindo o token de autenticação mais recente, pronto para ser copiado e colado.

## 7. Protocolo de Versionamento e Changelog

**Objetivo:** Manter um registro claro e cronológico das alterações do projeto, facilitando o versionamento e a comunicação.

**Regra Mandatória:**
- **Atualização do Changelog:** Antes de cada `push` para o repositório Git, o agente deve atualizar o arquivo `CHANGELOG.md`. A atualização deve mover os itens da seção `[Unreleased]` para uma nova seção de versão (ex: `[v0.2.0] - AAAA-MM-DD`) e adicionar os novos itens planejados na seção `[Unreleased]`.
- **Mensagens de Commit:** As mensagens de commit devem ser claras e seguir o padrão "feat: Descrição da funcionalidade" para novas funcionalidades, "fix: Descrição da correção" para bugs, e "docs: Descrição da atualização na documentação" para mudanças em arquivos `.md`.
