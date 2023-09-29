"use client";

import { HiOutlineTrash, HiPlus, HiMinus } from "react-icons/hi";

import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useAddToCart, useDecrementFromCart } from "@/hooks/useCart";

import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumber";

function CartItem({ cartItem }) {
  const { mutateAsync: addToCartAsync } = useAddToCart();
  const { mutateAsync: decFromCartAsync } = useDecrementFromCart();

  const queryClient = useQueryClient();

  const addToCartHandler = async () => {
    try {
      const { message } = await addToCartAsync(cartItem._id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      if (error?.response?.data) {
        toast.error(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : "خطایی رخ داد"
        );
      }
    }
  };

  const decrementHandler = async () => {
    try {
      const { message } = await decFromCartAsync(cartItem._id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      if (error?.response?.data) {
        toast.error(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : "خطایی رخ داد"
        );
      }
    }
  };

  return (
    <div className="flex justify-between p-4 border rounded-xl">
      <div className="flex-1 font-bold">{cartItem.title}</div>
      <div className="flex justify-between items-center flex-1 gap-x-8">
        <div>
          <div>
            قیمت :{" "}
            <span
              className={`${
                cartItem.discount ? "line-through text-gray-500" : "font-bold"
              }`}>
              {toPersianNumbersWithComma(cartItem.price)}
            </span>
          </div>
          {!!cartItem.discount && (
            <div className="flex items-center gap-x-2 mt-2">
              <p className="font-bold">
                {toPersianNumbersWithComma(cartItem.offPrice)}
              </p>
              <div className="py-0.5 px-2 rounded-xl text-sm text-white bg-rose-500">
                {toPersianNumbers(cartItem.discount)} %
              </div>
            </div>
          )}
        </div>

        <span className="pr-2 border-r-2">
          تعداد : {toPersianNumbers(cartItem.quantity)}
        </span>
        <div className="flex gap-x-3">
          <button
            onClick={addToCartHandler}
            className="p-1 rounded text-white bg-primary-900">
            <HiPlus className="w-4 h-4" />
          </button>
          <button onClick={decrementHandler} className="p-1 border rounded">
            {cartItem.quantity > 1 ? (
              <HiMinus className="w-4 h-4" />
            ) : (
              <HiOutlineTrash className="w-4 h-4 text-rose-500" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
