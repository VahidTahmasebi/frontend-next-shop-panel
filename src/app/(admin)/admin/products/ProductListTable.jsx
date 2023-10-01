import { HiCheckCircle, HiEye, HiTrash } from "react-icons/hi";
import { RiEdit2Line } from "react-icons/ri";

import Link from "next/link";

import { productListTableHead } from "@/constants/tableHeads";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumber";

function ProductListTable({ products }) {
  return (
    <div className="my-8 shadow-sm overflow-auto">
      <table className="w-full min-w-[800px] border-collapse text-sm table-auto">
        <thead>
          <tr>
            {productListTableHead.map((item) => {
              return (
                <th key={item.id} className="whitespace-nowrap table__th">
                  {item.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={product._id}>
                <td className="table__td">{index}</td>
                <td className="table__td font-bold whitespace-nowrap">
                  {product.title}
                </td>
                <td className="table__td">{product.category.title}</td>
                <td className="table__td">
                  {toPersianNumbersWithComma(product.price)}
                </td>
                <td className="table__td">
                  {toPersianNumbers(product.discount)}
                </td>
                <td className="table__td">
                  {toPersianNumbersWithComma(product.offPrice)}
                </td>
                <td className="table__td">
                  {toPersianNumbersWithComma(product.countInStock)}
                </td>
                <td className="table__td text-lg font-bold">
                  <div className="flex items-center gap-x-4">
                    <Link href={`/admin/products/${product._id}`}>
                      <HiEye className="w-6 h-6 text-primary-900" />
                    </Link>
                    <button>
                      <HiTrash className="w-6 h-6 text-rose-600" />
                    </button>
                    <Link href={`/admin/products/edit/${product._id}`}>
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

export default ProductListTable;
