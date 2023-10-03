import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { toPersianNumbersWithComma } from "@/utils/toPersianNumber";
import Loading from "@/common/Loading";

import { createPayment } from "@/services/paymentsServices";

function CartSummary({ payDetail }) {
  const { totalOffAmount, totalPrice, totalGrossPrice } = payDetail;

  const { isLoading, mutateAsync } = useMutation({ mutationFn: createPayment });

  const queryClient = useQueryClient();

  const createPaymentHandler = async () => {
    try {
      const { message } = await mutateAsync();
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
    <div className="p-2 border rounded-xl">
      <p className="mb-4 font-bold">اطلاعات پرداخت</p>
      <div className="flex justify-between items-center mb-4">
        <span>جمع کل</span>
        <span>{toPersianNumbersWithComma(totalGrossPrice)}</span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span>تخفیف</span>
        <span>{toPersianNumbersWithComma(totalOffAmount)} - </span>
      </div>
      <div className="flex justify-between items-center mb-6 font-bold">
        <span>مبلغ قابل پرداخت</span>
        <span>{toPersianNumbersWithComma(totalPrice)}</span>
      </div>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <button
            className="w-full btn btn--primary"
            onClick={createPaymentHandler}>
            ثبت سفارش
          </button>
        )}
      </div>
    </div>
  );
}

export default CartSummary;
