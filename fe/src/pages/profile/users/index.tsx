import { useUsers } from "../../../hooks/useUsers";
import React from "react";
import LayoutWithSidebar from "../profileLayout";

export default function Users() {
  const { users } = useUsers();

  return (
    <div className="overflow-x-auto container grid bg-blue-300 mx-auto">
      <table className="w-3/4 mx-auto text-sm text-left shadow-md text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Role</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: any, idx: number) => (
            <tr key={idx} className="bg-white border-b">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {user.name}
              </th>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Users.getLayout = function (page: any) {
  return <LayoutWithSidebar>{page}</LayoutWithSidebar>;
};
