import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumber";

import { getOneProductBySlug, getProducts } from "@/services/productServices";

import AddToCart from "./AddToCart";

export const dynamic = "force-static";
export const dynamicParams = false;

async function page({ params }) {
  const { slug } = params;

  const { product } = await getOneProductBySlug(slug);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">{product.title}</h1>
      <p className="mb-6">{product.description}</p>
      <p className="mb-6">
        قیمت محصول :{" "}
        <span className={`${product.discount ? "line-through" : "font-bold"}`}>
          {toPersianNumbersWithComma(product.price)}
        </span>
      </p>
      {!!product.discount && (
        <div className="flex items-center gap-x-2 mb-6">
          <p className="text-xl font-bold">
            قیمت با تخفیف : {toPersianNumbersWithComma(product.offPrice)}
          </p>
          <div className="py-0.5 px-2 rounded-xl text-sm text-white bg-rose-500">
            {toPersianNumbers(product.discount)} %
          </div>
        </div>
      )}
      <AddToCart product={product} />
    </div>
  );
}

export default page;

export async function generateStaticParams() {
  const { products } = await getProducts();

  return products.map((product) => ({
    slug: product.slug,
  }));
}
