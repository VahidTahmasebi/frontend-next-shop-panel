"use client";

import { AiFillLike, AiOutlineLike } from "react-icons/ai";

import toast from "react-hot-toast";

import { likeProduct } from "@/services/productServices";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function LikeProduct({ product }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const likeHandler = async () => {
    try {
      const { message } = await likeProduct(product._id);
      toast.success(message);
      router.refresh(pathname + "?" + searchParams.toString());
    } catch (error) {
      toast.error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "خطایی رخ داد"
      );
    }
  };

  return (
    <div className="mb-2">
      <button onClick={likeHandler}>
        {product.isLiked ? (
          <AiFillLike className="w-6 h-6 fill-primary-900" />
        ) : (
          <AiOutlineLike className="w-6 h-6 text-secondary-700" />
        )}
      </button>
    </div>
  );
}

export default LikeProduct;
