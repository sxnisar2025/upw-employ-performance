"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";

import SearchInput from "@/components/ui/SearchInput";

export default function PerformanceTable({ onEdit }) {
  const {
    performances,
    accounts,
    employees,
    deletePerformance,
  } = useApp();

  const { employee } = useAuth();

  const isAdmin = employee?.role === "admin";

  const [search, setSearch] = useState("");

  const filteredData = performances.filter((record) => {
    const account = accounts.find(
      (a) => a.id === record.accountId
    );

    const emp = employees.find(
      (e) => e.id === account?.employeeId
    );

    const employeeName = emp?.name || "";
    const accountName = account?.name || "";

    return (
      employeeName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      accountName
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  const handleDelete = (id) => {
    if (window.confirm("Delete this record?")) {
      deletePerformance(id);
    }
  };

  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="border-b p-5">
        <h2 className="text-xl font-semibold">
          Performance Records
        </h2>

        <p className="text-sm text-gray-500">
          Manage account performance.
        </p>
      </div>

      <div className="border-b p-4">
        <SearchInput
          placeholder="Search employee or account..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">

          <thead className="bg-gray-100">
            <tr>

              <th className="px-4 py-3 text-left">
                Month
              </th>

              <th className="px-4 py-3 text-left">
                Employee
              </th>

              <th className="px-4 py-3 text-left">
                Account
              </th>

              <th className="px-4 py-3 text-right">
                Buy
              </th>

              <th className="px-4 py-3 text-right">
                Earn
              </th>

              <th className="px-4 py-3 text-right">
                Received
              </th>

              <th className="px-4 py-3 text-right">
                Pending
              </th>

              <th className="px-4 py-3 text-right">
                Gross Profit
              </th>

              <th className="px-4 py-3 text-right">
                Net Profit
              </th>

              {isAdmin && (
                <th className="px-4 py-3 text-center">
                  Action
                </th>
              )}

            </tr>
          </thead>

          <tbody>

            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={isAdmin ? 10 : 9}
                  className="py-8 text-center text-gray-500"
                >
                  No records found.
                </td>
              </tr>
            ) : (
              filteredData.map((record) => {

                const account = accounts.find(
                  (a) => a.id === record.accountId
                );

                const emp = employees.find(
                  (e) => e.id === account?.employeeId
                );

                const grossProfit =
                  Number(record.earn || 0) -
                  Number(record.buy || 0);

                const netProfit =
                  Number(record.received || 0) -
                  Number(record.buy || 0);

                return (
                  <tr
                    key={record.id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-4 py-3">
                      {record.month}
                    </td>

                    <td className="px-4 py-3">
                      {emp?.name || "-"}
                    </td>

                    <td className="px-4 py-3">
                      {account?.name || "-"}
                    </td>

                    <td className="px-4 py-3 text-right">
                      ${record.buy}
                    </td>

                    <td className="px-4 py-3 text-right">
                      ${record.earn}
                    </td>

                    <td className="px-4 py-3 text-right">
                      ${record.received}
                    </td>

                    <td className="px-4 py-3 text-right">
                      ${record.pending}
                    </td>

                    <td className="px-4 py-3 text-right font-semibold text-green-600">
                      ${grossProfit}
                    </td>

                    <td className="px-4 py-3 text-right font-semibold text-blue-600">
                      ${netProfit}
                    </td>

                    {isAdmin && (
                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-3">

                          <Pencil
                            size={18}
                            className="cursor-pointer text-green-600"
                            onClick={() => onEdit(record)}
                          />

                          <Trash2
                            size={18}
                            className="cursor-pointer text-red-600"
                            onClick={() =>
                              handleDelete(record.id)
                            }
                          />

                        </div>
                      </td>
                    )}

                  </tr>
                );
              })
            )}

          </tbody>

        </table>
      </div>

    </div>
  );
}