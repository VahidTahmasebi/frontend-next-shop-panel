"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useGetUser } from "@/hooks/useAuth";
import { useAddToCart } from "@/hooks/useCart";

import Loading from "@/common/Loading";

function AddToCart({ product }) {
  const queryClient = useQueryClient();

  const router = useRouter();

  const { data } = useGetUser();
  const { user } = data || {};

  const { isLoading, mutateAsync } = useAddToCart();

  const addToCartHandler = async () => {
    if (!user) {
      toast.error("لطفا ابتدا وارد شوید.");
      router.push("/auth");
      return;
    }
    try {
      const { message } = await mutateAsync(product._id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      toast.error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "خطایی رخ داد"
      );
    }
  };

  const idInCart = (user, product) => {
    if (!user) false;

    return user?.cart?.products.some((p) => p.productId === product._id);
  };

  return (
    <div>
      {idInCart(user, product) ? (
        <Link href="/cart" className="font-bold text-primary-900">
          ادامه سفارش
        </Link>
      ) : isLoading ? (
        <Loading />
      ) : (
        <button onClick={addToCartHandler} className="btn btn--primary">
          اضافه کردن به سبد خرید
        </button>
      )}
    </div>
  );
}

export default AddToCart;
