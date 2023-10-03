import { HiTrash } from "react-icons/hi";
import { RiEdit2Line } from "react-icons/ri";

import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useRemoveCoupon } from "@/hooks/useCoupons";

import { couponListTableHead } from "@/constants/tableHeads";
import { toPersianNumbersWithComma } from "@/utils/toPersianNumber";
import { toLocalDateStringShort } from "@/utils/toLocalDate";

function CouponsListTable({ coupons }) {
  const { mutateAsync } = useRemoveCoupon();
  const queryClient = useQueryClient();

  const removeCouponHandler = async (id) => {
    try {
      const { message } = await mutateAsync(id);
      queryClient.invalidateQueries({ queryKey: ["get-coupons"] });
      toast.success(message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "خطایی رخ داد"
      );
    }
  };

  return (
    <div className="my-8 shadow-sm overflow-auto">
      <table className="w-full min-w-[800px] border-collapse text-sm table-auto">
        <thead>
          <tr>
            {couponListTableHead.map((item) => {
              return (
                <th key={item.id} className="whitespace-nowrap table__th">
                  {item.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon, index) => {
            return (
              <tr key={coupon._id}>
                <td className="table__td">{index + 1}</td>
                <td className="table__td font-bold whitespace-nowrap">
                  {coupon.code}
                </td>
                <td className="table__td">
                  <span className="badge badge--primary">{coupon.type}</span>
                </td>
                <td className="table__td">
                  {toPersianNumbersWithComma(coupon.amount)}
                </td>
                <td className="table__td">
                  <div className="flex flex-col items-start gap-y-2">
                    {coupon.productIds.map((product) => {
                      return (
                        <span
                          key={product._id}
                          className="badge badge--secondary">
                          {product.title}
                        </span>
                      );
                    })}
                  </div>
                </td>
                <td className="table__td">
                  {toPersianNumbersWithComma(coupon.usageCount)}
                </td>
                <td className="table__td">
                  {toPersianNumbersWithComma(coupon.usageLimit)}
                </td>
                <td className="table__td">
                  {toLocalDateStringShort(coupon.expireDate)}
                </td>
                <td className="table__td text-lg font-bold">
                  <div className="flex items-center gap-x-4">
                    <button onClick={() => removeCouponHandler(coupon._id)}>
                      <HiTrash className="w-6 h-6 text-rose-600" />
                    </button>
                    <Link href={`/admin/coupons/edit/${coupon._id}`}>
                      <RiEdit2Line className="w-6 h-6 text-secondary-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CouponsListTable;
