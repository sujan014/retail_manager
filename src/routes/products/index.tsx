import { ProductSchema } from '#/lib/schemas';
import type { CreateProductInput, ProductType } from '#/lib/types/product.type';
import {
  createProductFn,
  getAllProductsFn,
} from '#/server/products/products.function';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/products/')({
  loader: async (): Promise<{ allProducts: ProductType[] }> => {
    const allProducts = await getAllProductsFn();
    return { allProducts };
  },
  component: RouteAllProductsComponent,
});

function RouteAllProductsComponent() {
  const { allProducts } = Route.useLoaderData();
  const [productsList, setProductsList] = useState(allProducts);
  const [valErrors, setValErrors] = useState({
    name: '',
    description: '',
    brand: '',
    price: '',
    quantity: '',
    imageUrl: '',

    length: '',
    width: '',
    height: '',
    unit: '',

    availability: '',
    shipping_info: '',
    warranty_info: '',
  });

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const productData: CreateProductInput = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      brand: formData.get('brand') as string,
      price: Number(formData.get('price') as string) || 0,
      quantity: Number(formData.get('quantity') as string) || 0,
      imageUrl: 'blank URL', // for now make it empty
      spec: {
        length: Number(formData.get('length') as string) || 0,
        width: Number(formData.get('width') as string) || 0,
        height: Number(formData.get('height') as string) || 0,
        unit: formData.get('unit') as string,
      },
      stock: {
        availability: formData.get('availability') as string,
        shipping_info: formData.get('shipping_info') as string,
        warranty_info: formData.get('warranty_info') as string,
      },
    };
    //console.log('Product Data');console.log(productData);
    const zodValidate = ProductSchema.safeParse(productData);
    let errFlag = false;
    let errMsgs: any = {
      name: '',
      description: '',
      brand: '',
      price: '',
      quantity: '',
      imageUrl: '',

      length: '',
      width: '',
      height: '',
      unit: '',

      availability: '',
      shipping_info: '',
      warranty_info: '',
    };
    if (!zodValidate.success) {
      errFlag = true;
      zodValidate.error.issues.forEach((issue) => {
        const path_length = issue['path'].length;
        const path = issue['path'][path_length - 1].toString();
        const message = issue['message'];
        errMsgs[path] = message;
        //console.log(errMsgs);
      });
    }
    setValErrors(errMsgs);
    if (errFlag) return;
    try {
      const submit = await createProductFn({ data: productData });
      if (submit.success) {
        setProductsList((prev) => [...prev, submit.new_product]);
        event.target.reset();
      }
    } catch (validationErr: any) {
      //console.log('Errors: ', validationErr);
    }
  };

  return (
    <div>
      Products page
      <div className="border-gray-500 border">
        {productsList.map((prod) => (
          <div>{prod.name}</div>
        ))}
      </div>
      <form
        className="w-[90vw] md:w-[400px] my-5 p-5 border"
        onSubmit={handleSubmit}
        method="post"
      >
        <div className="w-[90vw] my-2 md:w-[300px] flex">
          <label htmlFor="name" className="w-1/3">
            Name
          </label>
          <input
            className="w-2/3 border p-1 rounded-md bg-gray-950"
            type="text"
            id="name"
            name="name"
            placeholder="Product name"
            required
          />
        </div>
        {valErrors.name && <p>{valErrors.name}</p>}
        <div className="w-[90vw] my-2 md:w-[300px] flex">
          <label htmlFor="description" className="w-1/3">
            Description
          </label>
          <input
            className="w-2/3 border p-1 rounded-md bg-gray-950"
            type="text"
            id="description"
            name="description"
            placeholder="Product description"
            required
          />
        </div>
        {valErrors.description && <p>{valErrors.description}</p>}
        <div className="w-[90vw] my-2 md:w-[300px] flex">
          <label htmlFor="brand" className="w-1/3">
            Brand
          </label>
          <input
            className="w-2/3 border p-1 rounded-md bg-gray-950"
            type="text"
            id="brand"
            name="brand"
            placeholder="Brand name"
            required
          />
        </div>
        {valErrors.brand && <p>{valErrors.brand}</p>}
        <div className="w-[90vw] my-2 md:w-[300px] flex">
          <label htmlFor="price" className="w-1/3">
            Price
          </label>
          <input
            className="w-2/3 border p-1 rounded-md bg-gray-950"
            type="number"
            id="price"
            name="price"
            placeholder="Product price"
            defaultValue={1}
            required
          />
        </div>
        {valErrors.price && <p>{valErrors.price}</p>}
        <div className="w-[90vw] my-2 md:w-[300px] flex">
          <label htmlFor="quantity" className="w-1/3">
            Quantity
          </label>
          <input
            className="w-2/3 border p-1 rounded-md bg-gray-950"
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Product quantity"
            defaultValue={1}
            required
          />
        </div>
        {valErrors.quantity && <p>{valErrors.quantity}</p>}
        <p className="mt-3">Specs</p>
        <div className="w-[90vw] my-2 md:w-[300px] flex">
          <label htmlFor="length" className="w-1/3">
            Length
          </label>
          <input
            className="w-2/3 border p-1 rounded-md bg-gray-950"
            type="number"
            id="length"
            name="length"
            placeholder="Product length"
            defaultValue={1}
            required
          />
        </div>
        {valErrors.length && <p>{valErrors.length}</p>}
        <div className="w-[90vw] my-2 md:w-[300px] flex">
          <label htmlFor="width" className="w-1/3">
            Width
          </label>
          <input
            className="w-2/3 border p-1 rounded-md bg-gray-950"
            type="number"
            id="width"
            name="width"
            placeholder="Product Width"
            defaultValue={1}
            required
          />
        </div>
        {valErrors.width && <p>{valErrors.width}</p>}
        <div className="w-[90vw] my-2 md:w-[300px] flex">
          <label htmlFor="height" className="w-1/3">
            Height
          </label>
          <input
            className="w-2/3 border p-1 rounded-md bg-gray-950"
            type="number"
            id="height"
            name="height"
            placeholder="Product height"
            defaultValue={1}
            required
          />
        </div>
        {valErrors.height && <p>{valErrors.height}</p>}
        <div className="w-[90vw] my-2 md:w-[300px] flex">
          <label htmlFor="unit" className="w-1/3">
            Unit
          </label>
          <input
            className="w-2/3 border p-1 rounded-md bg-gray-950"
            type="string"
            id="unit"
            name="unit"
            placeholder="Product unit"
            defaultValue={'mm'}
            required
          />
        </div>
        {valErrors.unit && <p>{valErrors.unit}</p>}
        <p className="mt-3">Stock Info</p>
        <div className="w-[90vw] my-2 md:w-[300px] flex">
          <label htmlFor="availability" className="w-1/3">
            Availability
          </label>
          <input
            className="w-2/3 border p-1 rounded-md bg-gray-950"
            type="string"
            id="availability"
            name="availability"
            placeholder="Product availability"
            required
          />
        </div>
        {valErrors.availability && <p>{valErrors.availability}</p>}
        <div className="w-[90vw] my-2 md:w-[300px] flex">
          <label htmlFor="shipping_info" className="w-1/3">
            Shippping Info
          </label>
          <input
            className="w-2/3 border p-1 rounded-md bg-gray-950"
            type="string"
            id="shipping_info"
            name="shipping_info"
            placeholder="Product shipping info"
            required
          />
        </div>
        {valErrors.shipping_info && <p>{valErrors.shipping_info}</p>}
        <div className="w-[90vw] my-2 md:w-[300px] flex">
          <label htmlFor="warranty_info" className="w-1/3">
            Warranty Info
          </label>
          <input
            className="w-2/3 border p-1 rounded-md bg-gray-950"
            type="string"
            id="warranty_info"
            name="warranty_info"
            placeholder="Product warranty info"
            required
          />
        </div>
        {valErrors.warranty_info && <p>{valErrors.warranty_info}</p>}
        <button
          type="submit"
          className="relative w-50 h-10 bg-[#43a8c8] text-white rounded-full flex justify-center items-center cursor-pointer"
        >
          <span className="text-lg">Add Product</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-shopping-basket preview-icon absolute right-2"
          >
            <path d="m15 11-1 9" />
            <path d="m19 11-4-7" />
            <path d="M2 11h20" />
            <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
            <path d="M4.5 15.5h15" />
            <path d="m5 11 4-7" />
            <path d="m9 11 1 9" />
          </svg>
        </button>
      </form>
    </div>
  );
}
