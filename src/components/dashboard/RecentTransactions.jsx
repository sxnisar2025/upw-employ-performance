"use client";

import { useApp } from "@/context/AppContext";

export default function RecentTransactions() {
  const { performances, accounts, employees } = useApp();

  const recent = [...performances]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="rounded-xl bg-white border shadow-sm">

      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold">
          Recent Transactions
        </h2>
      </div>

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Employee</th>
            <th className="px-4 py-3 text-left">Account</th>
            <th className="px-4 py-3 text-right">Earn</th>
          </tr>

        </thead>

        <tbody>

          {recent.map((record) => {

            const account = accounts.find(
              (a) => a.id === record.accountId
            );

            const employee = employees.find(
              (e) => e.id === account?.employeeId
            );

            return (

              <tr
                key={record.id}
                className="border-t"
              >

                <td className="px-4 py-3">
                  {record.date}
                </td>

                <td className="px-4 py-3">
                  {employee?.name}
                </td>

                <td className="px-4 py-3">
                  {account?.name}
                </td>

                <td className="px-4 py-3 text-right font-semibold text-green-600">
                  ${record.grossEarn}
                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

    </div>
  );
}