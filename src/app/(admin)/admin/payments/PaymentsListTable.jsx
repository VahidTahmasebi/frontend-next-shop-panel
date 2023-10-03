import { HiEye } from "react-icons/hi";

import Link from "next/link";

import { adminPaymentListTableHead } from "@/constants/tableHeads";

import { toLocalDateStringShort } from "@/utils/toLocalDate";
import { toPersianNumbersWithComma } from "@/utils/toPersianNumber";

function PaymentsListTable({ payments }) {
  return (
    <div className="my-8 shadow-sm overflow-auto">
      <table className="w-full min-w-[800px] border-collapse text-sm table-auto">
        <thead>
          <tr>
            {adminPaymentListTableHead.map((item) => {
              return (
                <th key={item.id} className="whitespace-nowrap table__th">
                  {item.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => {
            return (
              <tr key={payment._id}>
                <td className="table__td">{index + 1}</td>
                <td className="table__td whitespace-nowrap truncate">
                  {payment.invoiceNumber}
                </td>
                <td className="table__td max-w-[280px] whitespace-nowrap truncate">
                  {payment.description}
                </td>
                <td className="table__td whitespace-nowrap truncate">
                  <div className="flex flex-col gap-y-2">
                    <span>{payment.user.name}</span>
                    <span>{payment.user.email}</span>
                    <span className="font-bold">
                      {payment.user.phoneNumber}
                    </span>
                  </div>
                </td>
                <td className="table__td whitespace-nowrap truncate">
                  <div className="flex flex-col items-start gap-y-2">
                    {payment.cart.productDetail.map((product) => {
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
                <td className="table__td text-lg font-bold">
                  {toPersianNumbersWithComma(payment.amount)}
                </td>
                <td className="table__td">
                  {toLocalDateStringShort(payment.createdAt)}
                </td>
                <td className="table__td">
                  {payment.status === "COMPLETED" ? (
                    <span className="badge badge--success">موفق</span>
                  ) : (
                    <span className="badge badge--error">ناموفق</span>
                  )}
                </td>
                <td className="table__td">
                  <Link
                    href={`/admin/payments/${payment._id}`}
                    className="flex justify-center">
                    <HiEye className="w-6 h-6 text-primary-900" />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentsListTable;
