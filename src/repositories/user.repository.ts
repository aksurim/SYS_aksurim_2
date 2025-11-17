/**

Sys Aksurim (SA)

Copyright (c) 2024 Aksurim Software. Todos os direitos reservados.

Produtora: Aksurim Software

Website: https://aksurim.com */

import pool from '../database/mysql';
import { RowDataPacket } from 'mysql2';

// Interface para definir a estrutura do objeto User que vem do BD
export interface UserFromDB extends RowDataPacket {
  id: number;
  tenant_id: number;
  email: string;
  password: string; // Corresponde à coluna `password` no BD, que armazena o hash.
  subscription_status: string;
}

class UserRepository {
  async findByEmail(email: string): Promise<UserFromDB | null> {
    const [rows] = await pool.execute<UserFromDB[]>(
      `SELECT u.id, u.tenant_id, u.email, u.password, t.subscription_status 
       FROM users u
       JOIN tenants t ON u.tenant_id = t.id
       WHERE u.email = ?`,
      [email]
    );

    return rows[0] || null;
  }
}

export default new UserRepository();
