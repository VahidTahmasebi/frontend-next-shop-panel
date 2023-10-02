"use client";

import { useParams } from "next/navigation";

import { useGetProductById } from "@/hooks/useProducts";

import Loading from "@/common/Loading";

function page() {
  const { id } = useParams();
  const { data, isLoading } = useGetProductById(id);
  const { product } = data || {};

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="mb-4 text-xl font-bold">{product.title}</div>
    </div>
  );
}

export default page;
