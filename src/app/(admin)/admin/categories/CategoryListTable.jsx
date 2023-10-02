import { HiEye, HiTrash } from "react-icons/hi";
import { RiEdit2Line } from "react-icons/ri";

import Link from "next/link";

import { categoryListTableHead } from "@/constants/tableHeads";

function CategoryListTable({ categories }) {
  console.log(categories);
  return (
    <div className="my-8 shadow-sm overflow-auto">
      <table className="w-full min-w-[800px] border-collapse text-sm table-auto">
        <thead>
          <tr>
            {categoryListTableHead.map((item) => {
              return (
                <th key={item.id} className="whitespace-nowrap table__th">
                  {item.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => {
            return (
              <tr key={category._id}>
                <td className="table__td">{index}</td>
                <td className="table__td font-bold whitespace-nowrap">
                  {category.title}
                </td>
                <td className="table__td">{category.description}</td>
                <td className="table__td">{category.englishTitle}</td>
                <td className="table__td">
                  <span className="badge badge--secondary">
                    {category.type}
                  </span>
                </td>
                <td className="table__td text-lg font-bold">
                  <div className="flex items-center gap-x-4">
                    <Link href={`/admin/categories/${category._id}`}>
                      <HiEye className="w-6 h-6 text-primary-900" />
                    </Link>
                    <button>
                      <HiTrash className="w-6 h-6 text-rose-600" />
                    </button>
                    <Link href={`/admin/categories/edit/${category._id}`}>
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

export default CategoryListTable;
