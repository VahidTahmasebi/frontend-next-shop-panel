import { HiEye, HiTrash } from "react-icons/hi";
import { RiEdit2Line } from "react-icons/ri";

import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useRemoveCategory } from "@/hooks/useCategories";

import { categoryListTableHead } from "@/constants/tableHeads";

function CategoryListTable({ categories }) {
  const { mutateAsync } = useRemoveCategory();
  const queryClient = useQueryClient();

  const removeCategoryHandler = async (id) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-categories"] });
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
                <td className="table__td">{index + 1}</td>
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
                    <button onClick={() => removeCategoryHandler(category._id)}>
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
