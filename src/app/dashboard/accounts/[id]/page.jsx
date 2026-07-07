"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function AccountDetailsPage() {
  const { id } = useParams();

  const { accounts, employees, performances } = useApp();

  const account = accounts.find((a) => String(a.id) === String(id));

  if (!account) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Account not found</h1>

        <Link
          href="/dashboard/accounts"
          className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white"
        >
          Back
        </Link>
      </div>
    );
  }

  const employee = employees.find(
    (e) => e.id === account.employeeId
  );

  const accountRecords = performances.filter(
    (p) => p.accountId === account.id
  );

  return (
    <div className="space-y-6">

      <div className="rounded-xl border bg-white p-6">

        <h1 className="text-3xl font-bold">
          {account.name}
        </h1>

        <p className="mt-2 text-gray-600">
          Employee: {employee?.name}
        </p>

        <p className="text-gray-600">
          Category: {account.category}
        </p>

      </div>

      <div className="rounded-xl border bg-white">

        <div className="border-b p-5">
          <h2 className="text-xl font-semibold">
            Performance Records
          </h2>
        </div>

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-right">Connect</th>
              <th className="px-4 py-3 text-right">Gross</th>
              <th className="px-4 py-3 text-right">Received</th>
              <th className="px-4 py-3 text-right">Pending</th>
            </tr>

          </thead>

          <tbody>

            {accountRecords.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-gray-500"
                >
                  No performance records found.
                </td>
              </tr>
            ) : (
              accountRecords.map((record) => (
                <tr
                  key={record.id}
                  className="border-t"
                >
                  <td className="px-4 py-3">
                    {record.date}
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
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}