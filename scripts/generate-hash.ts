/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import bcrypt from 'bcryptjs';
import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';

// Este script gera um hash bcrypt para uma senha fornecida.
// Como usar:
// 1. Certifique-se de que o bcryptjs está instalado (`npm install bcryptjs`).
// 2. Execute o script com: `npx ts-node scripts/generate-hash.ts`
// 3. Digite a senha que deseja hashear e pressione Enter.
// 4. Copie o hash gerado e cole na coluna `password` da tabela `users` no seu banco de dados.

async function generateHash() {
  console.log('Gerador de Hash de Senha (bcrypt)');
  
  const rl = readline.createInterface({ input, output });
  const password = await rl.question('Por favor, digite a senha para gerar o hash: ');
  
  if (!password) {
    console.error('A senha não pode ser vazia.');
    rl.close();
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  console.log('\nSenha fornecida:', password);
  console.log('Hash gerado (copie isso para o banco de dados):');
  console.log(hash);
  
  rl.close();
}

generateHash();
