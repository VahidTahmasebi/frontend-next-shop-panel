import { HiCheckCircle } from "react-icons/hi";

import Link from "next/link";

import { usersListTableHead } from "@/constants/tableHeads";

import { toLocalDateStringShort } from "@/utils/toLocalDate";

function UsersTable({ users }) {
  return (
    <div className="my-8 shadow-sm overflow-auto">
      <table className="w-full min-w-[800px] border-collapse text-sm table-auto">
        <thead>
          <tr>
            {usersListTableHead.map((item) => {
              return (
                <th key={item.id} className="whitespace-nowrap table__th">
                  {item.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td className="table__td">{index + 1}</td>
                <td className="table__td whitespace-nowrap truncate">
                  {user.name}
                </td>
                <td className="table__td">{user.email}</td>
                <td className="table__td">
                  <div className="flex whitespace-nowrap items-center gap-x-2">
                    {user.phoneNumber}
                    {user.isVerifiedPhoneNumber && (
                      <HiCheckCircle className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                </td>
                <td className="table__td">
                  <div className="flex flex-col items-start gap-y-2">
                    {user.Products.map((product, index) => {
                      return (
                        <span key={index} className="badge badge--secondary">
                          {product.title}
                        </span>
                      );
                    })}
                  </div>
                </td>
                <td className="table__td">
                  {toLocalDateStringShort(user.createdAt)}
                </td>
                <td className="table__td  text-lg font-bold">
                  <Link href={`/admin/users/${user._id}`}>مشاهده جزئیات</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
