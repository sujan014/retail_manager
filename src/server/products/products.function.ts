import type { CreateProductInput, ProductType } from '#/lib/types/product.type';
import { createServerFn } from '@tanstack/react-start';
import { createProduct, getAllProducts } from './products.server';

export const getAllProductsFn = createServerFn({ method: 'GET' }).handler(
  async (): Promise<ProductType[]> => {
    const prods = await getAllProducts();

    // map product model to ProductType here
    const productMapped: ProductType[] = prods.map((prod) => {
      const mapping: ProductType = {
        pid: prod.pid,
        createdAt: prod.createdAt,
        name: prod.name,
        description: prod.description,
        brand: prod.brand,
        price: prod.price,
        quantity: prod.quantity,
        imageUrl: prod.imageUrl,
        spec: {
          length: prod.length,
          width: prod.width,
          height: prod.height,
          unit: prod.unit,
        },
        stock: {
          availability: prod.availability,
          shipping_info: prod.shipping_info,
          warranty_info: prod.warranty_info,
        },
      };
      return mapping;
    });
    return productMapped;
  },
);

export const createProductFn = createServerFn({ method: 'POST' })
  .validator((productData: CreateProductInput) => productData)
  .handler(async ({ data }) => {
    try {
      const prod = await createProduct(data);
      const mappedProduct: ProductType = {
        pid: prod.pid,
        createdAt: prod.createdAt,
        name: prod.name,
        description: prod.description,
        brand: prod.brand,
        price: prod.price,
        quantity: prod.quantity,
        imageUrl: prod.imageUrl,
        spec: {
          length: prod.length,
          width: prod.width,
          height: prod.height,
          unit: prod.unit,
        },
        stock: {
          availability: prod.availability,
          shipping_info: prod.shipping_info,
          warranty_info: prod.warranty_info,
        },
      };
      return {
        new_product: mappedProduct,
        success: true,
      };
    } catch (error) {
      return {
        message: error instanceof Error ? error.message : 'Unknown error',
        success: false,
      };
    }
  });
