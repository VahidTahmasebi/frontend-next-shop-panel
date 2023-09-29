"use client";

import Link from "next/link";

import { useGetUser } from "@/hooks/useAuth";

import Loading from "@/common/Loading";

function Cart() {
  const { data, isLoading } = useGetUser();
  const { user, cart } = data || {};

  if (isLoading) return <Loading />;

  if (!user || !data)
    return (
      <div className="lg:max-w-screen-lg container">
        <p className="mb-4 font-bold">برای مشاهده سبد خرید لطفا وارد شوید</p>
        <Link href="/auth" className="text-lg font-bold text-primary-900">
          رفتن به صفحه ورود
        </Link>
      </div>
    );

  if (!user.cart.products || user.cart.products.length === 0)
    return (
      <div>
        <p>سبد خرید خالیه!</p>
        <Link href="/products" className="text-lg font-bold text-primary-900">
          رفتن به صفحه محصولات
        </Link>
      </div>
    );

  return (
    <div>
      {cart &&
        cart.productDetail.map((item) => {
          return <div key={item._id}>{item.title}</div>;
        })}
    </div>
  );
}

export default Cart;
