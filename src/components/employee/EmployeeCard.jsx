import Link from "next/link";
import { calculateEmployeeSummary } from "@/utils/calculations";

export default function EmployeeCard({ employee }) {
  const summary = calculateEmployeeSummary(employee);

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold">{employee.name}</h3>

          <p className="mt-1 text-sm text-gray-500">
            {summary.accounts} Accounts
          </p>
        </div>

        <Link
          href={`/dashboard/employees/${employee.id}`}
          className="text-blue-600 hover:underline"
        >
          View Details →
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">

        <div>
          <p className="text-sm text-gray-500">Connect Cost</p>
          <p className="font-semibold">${summary.connectCost}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Gross Earn</p>
          <p className="font-semibold">${summary.grossEarn}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Received</p>
          <p className="font-semibold">${summary.received}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Pending</p>
          <p className="font-semibold">${summary.pending}</p>
        </div>

      </div>

      <div className="mt-6 flex justify-between border-t pt-4">
        <span className="text-gray-500">Net Profit</span>

        <span className="font-bold text-green-600">
          ${summary.netProfit}
        </span>
      </div>
    </div>
  );
}