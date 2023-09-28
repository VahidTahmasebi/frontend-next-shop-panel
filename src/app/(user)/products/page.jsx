import queryString from "query-string";

import { getCategories } from "@/services/categoryServices";
import { getProducts } from "@/services/productServices";

import CategorySidebar from "./CategorySidebar";

export const dynamic = "force-dynamic";

async function Products({ searchParams }) {
  const categoryPromise = getCategories();
  const productsPromise = getProducts(queryString.stringify(searchParams));

  const [{ products }, { categories }] = await Promise.all([
    categoryPromise,
    productsPromise,
  ]);

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold">صفحه محصولات</h1>

      <div className="grid grid-cols-4">
        <CategorySidebar categories={categories} />

        <div>
          {products.map((product) => {
            return (
              <div
                key={product._id}
                className="col-span-1 p-4 border rounded-xl shadow-md">
                <h2 className="font-bold">{product.title}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Products;
