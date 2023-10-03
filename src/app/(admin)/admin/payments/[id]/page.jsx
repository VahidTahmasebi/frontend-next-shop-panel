"use client";

import { useParams } from "next/navigation";

import { useGetPaymentById } from "@/hooks/usePayments";

import Loading from "@/common/Loading";

function page() {
  const { id } = useParams();

  const { data, isLoading } = useGetPaymentById(id);
  const { payment } = data || {};

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="mb-4 text-xl font-bold">{payment[0].description}</div>
    </div>
  );
}

export default page;
