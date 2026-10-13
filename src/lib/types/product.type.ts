export interface CreateProductInput {
  name: string;
  description: string;
  brand: string;
  price: number;
  quantity: number;
  imageUrl: string;
  spec: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  stock: {
    availability: string;
    shipping_info: string;
    warranty_info: string;
  };
}

export interface ProductType extends CreateProductInput {
  pid: number;
  createdAt: string;
  //updatedAt: string;
}
