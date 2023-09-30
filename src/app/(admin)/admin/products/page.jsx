"use client";

import { useGetProducts } from "@/hooks/useProducts";

import Loading from "@/common/Loading";

import ProductListTable from "./ProductListTable";

function page() {
  const { isLoading, data } = useGetProducts();
  const { products } = data || {};

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="mb-5 text-xl font-bold">محصولات</h1>
      <ProductListTable products={products} />
    </div>
  );
}

export default page;
