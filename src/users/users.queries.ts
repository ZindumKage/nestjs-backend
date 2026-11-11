import { db } from '../prisma/db';

export async function createUser(name: string, email: string, password: string) {
  return await db.orm.public.User.create({
    name: name,
    email: email,
    password: password,
  });
}

export async function getAllUsers() {
  return await db.orm.public.User.all();
}

export async function getUsersById(userId: number) {
  return await db.orm.public.User.where({ id: userId }).first();
}

export async function updateUser(
  userId: number,
  updateData: {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
  },
) {
  return await db.orm.public.User.where({ id: userId }).update({
    ...updateData,
  });
}
{
}
