import z from 'zod';

export const UserSchema = z.object({
  email: z.string().min(2, 'Email must be at least 1 characters long'),
  username: z.string().min(2, 'Username must be at least 2 character long.'),
  role: z.string().min(2, 'Role must not be empty.'),
  name: z.string().min(2, 'Name must be at least 2 character long.'),
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
});

const specSchema = z.object({
  length: z.number().gt(0, 'Length must be greater than 0'),
  width: z.number().gt(0, 'Width must be greater than 0'),
  height: z.number().gt(0, 'Height must be greater than 0'),
  unit: z.string(),
});
const stockSchema = z.object({
  availability: z.string(),
  shipping_info: z.string(),
  warranty_info: z.string(),
});
export const ProductSchema = z.object({
  name: z.string().min(2, 'Name must be atleast 1 character long'),
  description: z
    .string()
    .min(3, 'Description must be atleast 3 characters long'),
  brand: z.string().min(2, 'Brand name must be atleast 2 characters long'),
  price: z.number().gt(0, 'Price must be greater than 0'),
  quantity: z.number().gt(0, 'Quantity must be greater than 0'),
  imageUrl: z.string(),
  spec: specSchema,
  stock: stockSchema,
});
