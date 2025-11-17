/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/user.repository';

class AuthService {
  async login(email: string, password: string): Promise<string> {
    // 1. Buscar usuário
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error('Usuário ou senha inválidos.');
    }

    // 2. Verificar status da assinatura
    if (user.subscription_status !== 'active') {
      throw new Error(`Acesso bloqueado. Status da assinatura: ${user.subscription_status}.`);
    }

    // 3. Verificar senha
    // No schema.sql, a coluna é `password`, mas no repository usei `password_hash` para clareza.
    // Vamos assumir que o repository retorna a coluna `password` como `password`.
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Usuário ou senha inválidos.');
    }

    // 4. Gerar token JWT
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('O segredo JWT não está configurado.');
    }

    const token = jwt.sign(
      { 
        id_usuario: user.id, // Convenção PT-BR
        tenant_id: user.tenant_id 
      },
      jwtSecret,
      { expiresIn: '8h' }
    );

    return token;
  }
}

export default new AuthService();
