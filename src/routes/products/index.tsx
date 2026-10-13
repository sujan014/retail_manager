import type { ProductType } from '#/lib/types/product.type';
import { getAllProductsFn } from '#/server/products/products.function';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/products/')({
  loader: async (): Promise<{ allProducts: ProductType[] }> => {
    const allProducts = await getAllProductsFn();
    return { allProducts };
  },
  component: RouteAllProductsComponent,
});

function RouteAllProductsComponent() {
  const { allProducts } = Route.useLoaderData();

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    // do nothing for now
  };

  return (
    <div>
      Products page
      <div className="border-gray-500 border">
        {allProducts.map((prod) => (
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
            required
          />
        </div>
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
            required
          />
        </div>
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
            required
          />
        </div>
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
            required
          />
        </div>
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
            required
          />
        </div>
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
            required
          />
        </div>
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
        <div className="w-[90vw] my-2 md:w-[300px] flex">
          <label htmlFor="shippping_info" className="w-1/3">
            Shippping Info
          </label>
          <input
            className="w-2/3 border p-1 rounded-md bg-gray-950"
            type="string"
            id="shippping_info"
            name="shippping_info"
            placeholder="Product shippping info"
            required
          />
        </div>
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
