"use client";

import { useGetPayments } from "@/hooks/usePayments";

import Loading from "@/common/Loading";

import PaymentsListTable from "./PaymentsListTable";

function page() {
  const { isLoading, data } = useGetPayments();
  const { payments } = data || {};

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="mb-5 text-xl font-bold">سفارشات</h1>
      </div>
      <PaymentsListTable payments={payments} />
    </div>
  );
}

export default page;
