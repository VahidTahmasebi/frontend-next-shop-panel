import Link from "next/link";
import queryString from "query-string";
import { cookies } from "next/dist/client/components/headers";

import { toLocalDateStringShort } from "@/utils/toLocalDate";
import { toStringCookies } from "@/utils/toStringCookies";

import { getCategories } from "@/services/categoryServices";
import { getProducts } from "@/services/productServices";

import CategorySidebar from "./CategorySidebar";
import AddToCart from "./[slug]/AddToCart";
import LikeProduct from "./LikeProduct";

export const dynamic = "force-dynamic";

async function Products({ searchParams }) {
  const cookieStore = cookies();
  const strCookies = toStringCookies(cookieStore);

  const categoryPromise = getCategories();
  const productsPromise = getProducts(
    queryString.stringify(searchParams),
    strCookies
  );

  const [{ products }, { categories }] = await Promise.all([
    productsPromise,
    categoryPromise,
  ]);

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold">صفحه محصولات</h1>

      <div className="grid grid-cols-4">
        <CategorySidebar categories={categories} />

        <div className="col-span-3">
          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => {
              return (
                <div
                  key={product._id}
                  className="col-span-1 p-4 border rounded-xl shadow-md">
                  <h2 className="mb-4 text-xl font-bold">{product.title}</h2>
                  <div className="mb-4">
                    <span>تاریخ ایجاد: </span>
                    <span className="font-bold">
                      {toLocalDateStringShort(product.createdAt)}
                    </span>
                  </div>
                  <Link
                    href={`/products/${product.slug}`}
                    className="block mb-4 text-primary-900 font-bold">
                    مشاهده محصول
                  </Link>
                  <LikeProduct product={product} />
                  <AddToCart product={product} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
