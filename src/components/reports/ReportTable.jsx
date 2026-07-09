"use client";

import { useApp } from "@/context/AppContext";

export default function ReportTable({ records }) {
  const { employees, accounts } = useApp();

  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Month</th>
            <th className="border px-4 py-2">Employee</th>
            <th className="border px-4 py-2">Account</th>
            <th className="border px-4 py-2 text-right">Buy</th>
            <th className="border px-4 py-2 text-right">Earn</th>
            <th className="border px-4 py-2 text-right">Received</th>
            <th className="border px-4 py-2 text-right">Pending</th>
          </tr>
        </thead>

        <tbody>
          {records.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="py-6 text-center"
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

              return (
                <tr key={record.id}>
                  <td className="border px-4 py-2">
                    {record.month}
                  </td>

                  <td className="border px-4 py-2">
                    {employee?.name ?? "-"}
                  </td>

                  <td className="border px-4 py-2">
                    {account?.name ?? "-"}
                  </td>

                  <td className="border px-4 py-2 text-right">
                    {record.buy}
                  </td>

                  <td className="border px-4 py-2 text-right">
                    ${record.earn}
                  </td>

                  <td className="border px-4 py-2 text-right">
                    ${record.received}
                  </td>

                  <td className="border px-4 py-2 text-right">
                    ${record.pending}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}