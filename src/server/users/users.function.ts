// src/server/users.functions.ts

import { createServerFn } from '@tanstack/react-start';
import { createUser, getUsers } from './users.server';
import type { CreateUserInput, UserType } from '#/lib/types/user.type';

export const getUsersFn = createServerFn({
  method: 'GET',
}).handler(async (): Promise<UserType[]> => {
  const users = await getUsers();
  return users;
});

export const createUserFn = createServerFn({ method: 'POST' })
  .validator((userData: CreateUserInput) => userData)
  .handler(async ({ data }) => {
    try {
      const newUser = await createUser(data);
      console.table(newUser);
      return {
        new_user: newUser,
        success: true,
      };
    } catch (error) {
      return {
        message: error instanceof Error ? error.message : 'Unknown error',
        success: false,
      };
    }
  });
