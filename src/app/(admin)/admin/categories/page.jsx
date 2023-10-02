"use client";

import { HiPlusCircle } from "react-icons/hi";

import Link from "next/link";

import { useGetCategories } from "@/hooks/useCategories";

import Loading from "@/common/Loading";

import CategoryListTable from "./CategoryListTable";

function page() {
  const { isLoading, data } = useGetCategories();
  const { categories } = data || {};

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="mb-5 text-xl font-bold">محصولات</h1>
        <Link
          href="/admin/categories/add"
          className="flex items-center gap-x-2 font-bold text-primary-900">
          <HiPlusCircle className="w-6 h-6" /> <span>اضافه کردن دسته بندی</span>
        </Link>
      </div>
      <CategoryListTable categories={categories} />
    </div>
  );
}

export default page;
