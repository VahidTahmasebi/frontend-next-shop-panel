"use client";

import { useParams } from "next/navigation";

import { useGetCategoryById } from "@/hooks/useCategories";

import Loading from "@/common/Loading";

function page() {
  const { id } = useParams();

  const { data, isLoading } = useGetCategoryById(id);
  const { category } = data || {};

  if (isLoading) return <Loading />;

  return (
    <div>
      {/* <div className="mb-4 text-xl font-bold">{category.title}</div> */}
    </div>
  );
}

export default page;
