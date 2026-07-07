"use client";

import { useApp } from "@/context/AppContext";

export default function PendingPayments() {

  const {
    performances,
    accounts,
    employees,
  } = useApp();

  const pending = performances.filter(
    (item) => Number(item.pendingAmount) > 0
  );

  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="border-b px-6 py-4">

        <h2 className="text-xl font-semibold">
          Pending Payments
        </h2>

      </div>

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-4 py-3 text-left">
              Employee
            </th>

            <th className="px-4 py-3 text-left">
              Account
            </th>

            <th className="px-4 py-3 text-right">
              Pending
            </th>

          </tr>

        </thead>

        <tbody>

          {pending.map((record) => {

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
                  {employee?.name}
                </td>

                <td className="px-4 py-3">
                  {account?.name}
                </td>

                <td className="px-4 py-3 text-right text-orange-600 font-semibold">
                  ${record.pendingAmount}
                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

    </div>
  );
}