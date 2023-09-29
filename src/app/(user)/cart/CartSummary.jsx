import { toPersianNumbersWithComma } from "@/utils/toPersianNumber";

function CartSummary({ payDetail }) {
  const { totalOffAmount, totalPrice, totalGrossPrice } = payDetail;

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
      <button className="w-full btn btn--primary">ثبت سفارش</button>
    </div>
  );
}

export default CartSummary;
