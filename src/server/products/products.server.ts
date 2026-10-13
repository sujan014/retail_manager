import { db } from '#/prisma/db';

export async function getAllProducts() {
  const products = await db.orm.public.Product.all();
  return products;
}
