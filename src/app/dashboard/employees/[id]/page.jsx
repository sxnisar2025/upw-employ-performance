import Link from "next/link";
import employees from "@/data/employees";
import accounts from "@/data/accounts";
import { calculateEmployeeSummary } from "@/utils/calculations";

export default async function EmployeeDetails({ params }) {
  const id = Number(params.id);

  const employee = employees.find((e) => e.id === id);

  if (!employee) {
    return (
      <div className="text-center text-red-600">
        Employee not found.
      </div>
    );
  }

  const employeeAccounts = accounts.filter(
    (account) => account.employeeId === id
  );

  const summary = calculateEmployeeSummary(id);

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {employee.name}
          </h1>

          <p className="text-gray-500">
            Employee Details
          </p>
        </div>

        <Link
          href="/dashboard/employees"
          className="rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-800"
        >
          ← Back
        </Link>
      </div>

      {/* Employee Information */}

      <div className="rounded-xl border bg-white p-6 shadow">

        <h2 className="mb-5 text-xl font-semibold">
          Employee Information
        </h2>

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <p className="text-gray-500">Name</p>
            <p className="font-medium">{employee.name}</p>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <p>{employee.email}</p>
          </div>

          <div>
            <p className="text-gray-500">Phone</p>
            <p>{employee.phone}</p>
          </div>

          <div>
            <p className="text-gray-500">Status</p>

            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                employee.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {employee.status}
            </span>
          </div>

          <div>
            <p className="text-gray-500">Joined Date</p>
            <p>{employee.joinedDate}</p>
          </div>

        </div>

      </div>

      {/* Accounts */}

      <div className="rounded-xl border bg-white p-6 shadow">

        <h2 className="mb-5 text-xl font-semibold">
          Assigned Accounts
        </h2>

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-4 py-3 text-left">
                Account
              </th>

              <th className="px-4 py-3 text-left">
                Category
              </th>

              <th className="px-4 py-3 text-center">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {employeeAccounts.map((account) => (

              <tr
                key={account.id}
                className="border-t"
              >

                <td className="px-4 py-3">
                  {account.name}
                </td>

                <td className="px-4 py-3">
                  {account.category}
                </td>

                <td className="px-4 py-3 text-center">

                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">

                    {account.status}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Summary */}

      <div className="rounded-xl border bg-white p-6 shadow">

        <h2 className="mb-5 text-xl font-semibold">
          Performance Summary
        </h2>

        <div className="grid gap-5 md:grid-cols-3">

          <SummaryCard
            title="Accounts"
            value={summary.accounts}
          />

          <SummaryCard
            title="Connect Cost"
            value={`$${summary.connectCost}`}
          />

          <SummaryCard
            title="Gross Earn"
            value={`$${summary.grossEarn}`}
          />

          <SummaryCard
            title="Received"
            value={`$${summary.received}`}
          />

          <SummaryCard
            title="Pending"
            value={`$${summary.pending}`}
          />

          <SummaryCard
            title="Gross Profit"
            value={`$${summary.grossProfit}`}
          />

          <SummaryCard
            title="Net Profit"
            value={`$${summary.netProfit}`}
          />

        </div>

      </div>

    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="rounded-lg border p-5">

      <p className="text-gray-500">
        {title}
      </p>

      <h2 className="mt-2 text-2xl font-bold">
        {value}
      </h2>

    </div>
  );
}