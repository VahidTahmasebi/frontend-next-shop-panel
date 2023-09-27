import queryString from "query-string";

import { getCategories } from "@/services/categoryServices";
import { getProducts } from "@/services/productServices";
import CategorySidebar from "./CategorySidebar";

async function Products({ searchParams }) {
  const { categories } = await getCategories();
  const { products } = await getProducts(queryString.stringify(searchParams));

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
