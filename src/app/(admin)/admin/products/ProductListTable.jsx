import { HiCheckCircle } from "react-icons/hi";

import Link from "next/link";

import { productListTableHead } from "@/constants/tableHeads";

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
                <td className="table__td">{product.price}</td>
                <td className="table__td">{product.discount}</td>
                <td className="table__td">{product.offPrice}</td>
                <td className="table__td">{product.countInStock}</td>
                <td className="table__td  text-lg font-bold">
                  <Link href={`/admin/products/${product._id}`}>
                    مشاهده جزئیات
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

export default ProductListTable;
