"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useGetUser } from "@/hooks/useAuth";

import { addToCart } from "@/services/cartService";

import Loading from "@/common/Loading";

function AddToCart({ product }) {
  const queryClient = useQueryClient();

  const router = useRouter();

  const { data } = useGetUser();
  const { user } = data || {};

  const { isLoading, error, mutateAsync } = useMutation({
    mutationFn: addToCart,
  });

  const addToCartHandler = async () => {
    if (!user) {
      toast.error("لطفا ابتدا وارد شوید.");
      router.push("/auth");
      return;
    }
    try {
      const { message } = await mutateAsync(product._id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["grt-user"] });
    } catch (error) {
      toast.error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "خطایی رخ داد"
      );
    }
  };

  return (
    <div>
      {isLoading ? (
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
