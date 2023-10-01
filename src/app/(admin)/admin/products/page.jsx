"use client";

import { HiPlusCircle } from "react-icons/hi";

import Link from "next/link";

import { useGetProducts } from "@/hooks/useProducts";

import Loading from "@/common/Loading";

import ProductListTable from "./ProductListTable";

function page() {
  const { isLoading, data } = useGetProducts();
  const { products } = data || {};

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="mb-5 text-xl font-bold">محصولات</h1>
        <Link
          href="/admin/products/add"
          className="flex items-center gap-x-2 font-bold text-primary-900">
          <HiPlusCircle className="w-6 h-6" /> <span>اضافه کردن محصول</span>
        </Link>
      </div>
      <ProductListTable products={products} />
    </div>
  );
}

export default page;
