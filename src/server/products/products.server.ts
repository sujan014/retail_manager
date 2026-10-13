import type { CreateProductInput } from '#/lib/types/product.type';
import { db } from '#/prisma/db';

export async function getAllProducts() {
  const products = await db.orm.public.Product.all();
  return products;
}

export async function createProduct(data: CreateProductInput) {
  const productSchema = {
    name: data.name,
    description: data.description,
    brand: data.brand,
    price: data.price,
    quantity: data.quantity,
    imageUrl: data.imageUrl,
    length: data.spec.length,
    width: data.spec.width,
    height: data.spec.height,
    unit: data.spec.unit,
    availability: data.stock.availability,
    shipping_info: data.stock.shipping_info,
    warranty_info: data.stock.warranty_info,
  };
  return await db.orm.public.Product.create(productSchema);
}
