"use client";

import { useApp } from "@/context/AppContext";

export default function ReportTable({ records = [] }) {
  const { employees, accounts } = useApp();

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold">
          Report Records
        </h2>
      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-4 py-3 text-left">
                Date
              </th>

              <th className="px-4 py-3 text-left">
                Employee
              </th>

              <th className="px-4 py-3 text-left">
                Account
              </th>

              <th className="px-4 py-3 text-right">
                Connect Cost
              </th>

              <th className="px-4 py-3 text-right">
                Gross Earn
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

            </tr>

          </thead>

          <tbody>

            {records.length === 0 ? (

              <tr>

                <td
                  colSpan={9}
                  className="py-10 text-center text-gray-500"
                >
                  No records found.
                </td>

              </tr>

            ) : (

              records.map((record) => {

                const account = accounts.find(
                  (a) => a.id === record.accountId
                );

                const employee = employees.find(
                  (e) => e.id === account?.employeeId
                );

                const grossProfit =
                  Number(record.grossEarn || 0) -
                  Number(record.connectCost || 0);

                const netProfit =
                  Number(record.receivedAmount || 0) -
                  Number(record.connectCost || 0);

                return (

                  <tr
                    key={record.id}
                    className="border-t hover:bg-gray-50"
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

                    <td className="px-4 py-3 text-right">
                      ${record.connectCost}
                    </td>

                    <td className="px-4 py-3 text-right">
                      ${record.grossEarn}
                    </td>

                    <td className="px-4 py-3 text-right">
                      ${record.receivedAmount}
                    </td>

                    <td className="px-4 py-3 text-right">
                      ${record.pendingAmount}
                    </td>

                    <td className="px-4 py-3 text-right text-green-600 font-semibold">
                      ${grossProfit}
                    </td>

                    <td className="px-4 py-3 text-right text-blue-600 font-semibold">
                      ${netProfit}
                    </td>

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