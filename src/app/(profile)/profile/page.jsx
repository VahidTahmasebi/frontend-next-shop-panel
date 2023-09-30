"use client";

import Link from "next/link";

import { useGetUser } from "@/hooks/useAuth";

import { toLocalDateString } from "@/utils/toLocalDate";
import Loading from "@/common/Loading";

import PaymentTable from "./payments/paymentTable";

function Profile() {
  const { data, isLoading } = useGetUser();
  const { user, payments } = data || {};

  if (isLoading) return <Loading />;

  return (
    <div className="py-4">
      <h1 className="mb-4 text-xl">{user.name} خوش آمدی</h1>
      <p className="font-bold">
        <span className="font-bold">
          تاریخ پیوستن: {toLocalDateString(user.createdAt)}
        </span>
      </p>
      <div className="mt-8 p-4 border rounded-xl">
        <div className="flex justify-between items-center">
          <h2 className="font-bold">آخرین سفارشات کاربر</h2>
          <Link href="/profile/payments" className="text-primary-900">
            مشاهده همه سفارشات
          </Link>
        </div>
        <PaymentTable
          payments={payments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3)}
        />
      </div>
    </div>
  );
}

export default Profile;
