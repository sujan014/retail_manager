// src/server/users.server.ts

import type { CreateUserInput } from '#/lib/types/user.type';
import { db } from '../../prisma/db';

export async function getUsers() {
  const users = await db.orm.public.User.all();
  return users;
}

export async function createUser(data: CreateUserInput) {
  //console.log('createUser function:', data);
  return await db.orm.public.User.create(data);
}
