"use client";

import Link from "next/link";

import { useGetUser } from "@/hooks/useAuth";

import Loading from "@/common/Loading";

import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

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
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3 space-y-5">
        {cart &&
          cart.productDetail.map((item) => {
            return <CartItem cartItem={item} />;
          })}
      </div>
      <div className="col-span-1">
        <CartSummary payDetail={cart.payDetail} />
      </div>
    </div>
  );
}

export default Cart;
