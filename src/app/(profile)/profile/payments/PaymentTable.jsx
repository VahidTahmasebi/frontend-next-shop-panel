import { userPaymentTHead } from "@/constants/tableHeads";

import { toLocalDateStringShort } from "@/utils/toLocalDate";

function PaymentTable({ payments }) {
  return (
    <div className="my-8 shadow-sm overflow-auto">
      <table className="w-full min-w-[800px] border-collapse text-sm table-auto">
        <thead>
          <tr>
            {userPaymentTHead.map((item) => {
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
                <td className="table__td">{index}</td>
                <td className="table__td">{payment.invoiceNumber}</td>
                <td className="table__td max-w-[280px] whitespace-nowrap truncate">
                  {payment.description}
                </td>
                <td className="table__td">
                  <div className="flex flex-col items-start gap-y-2">
                    {payment.cart.productDetail.map((product) => {
                      return (
                        <span
                          key={product._id}
                          className="py-1 px-2 rounded-xl text-white bg-secondary-600 whitespace-nowrap">
                          {product.title}
                        </span>
                      );
                    })}
                  </div>
                </td>
                <td className="table__td">{payment.amount}</td>
                <td className="table__td">
                  {toLocalDateStringShort(payment.createdAt)}
                </td>
                <td className="table__td">
                  {payment.status === "COMPLETED" ? (
                    <span className="py-0 px-2 rounded-xl text-white bg-green-500">
                      موفق
                    </span>
                  ) : (
                    <span className="py-0 px-2 rounded-xl text-white bg-rose-500">
                      ناموفق
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentTable;
