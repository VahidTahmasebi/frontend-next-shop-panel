"use client";

import { HiPlusCircle } from "react-icons/hi";

import Link from "next/link";

import { useGetCoupons } from "@/hooks/useCoupons";

import Loading from "@/common/Loading";

import CouponsListTable from "./CouponsListTable";

function page() {
  const { isLoading, data } = useGetCoupons();
  const { coupons } = data || {};

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="mb-5 text-xl font-bold">کدهای تخفیف</h1>
        <Link
          href="/admin/coupons/add"
          className="flex items-center gap-x-2 font-bold text-primary-900">
          <HiPlusCircle className="w-6 h-6" /> <span>اضافه کردن کد تخفیف</span>
        </Link>
      </div>
      <CouponsListTable coupons={coupons} />
    </div>
  );
}

export default page;
