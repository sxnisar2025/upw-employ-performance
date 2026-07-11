import { employees } from "@/data/mockData";
const { employees, accounts, performances } = useApp();
import { calculateEmployeeSummary } from "@/utils/calculations";
export default function EmployeeSummary() {
  const summary = employees.map((employee) => ({
  ...employee,
  ...calculateEmployeeSummary(employee),
}));

  return (
    <div className="rounded-xl bg-white shadow border overflow-hidden">
      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold">
          Employee Summary
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Employee</th>
              <th className="px-6 py-3 text-center">Accounts</th>
              <th className="px-6 py-3 text-right">Connect Cost</th>
              <th className="px-6 py-3 text-right">Gross Earn</th>
              <th className="px-6 py-3 text-right">Received</th>
              <th className="px-6 py-3 text-right">Pending</th>
              <th className="px-6 py-3 text-right">Net Profit</th>
            </tr>
          </thead>

          <tbody>
            {summary.map((employee) => (
              <tr
                key={employee.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium">
                  {employee.name}
                </td>

                <td className="px-6 py-4 text-center">
                  {employee.accounts}
                </td>

                <td className="px-6 py-4 text-right">
                  ${employee.connectCost}
                </td>

                <td className="px-6 py-4 text-right">
                  ${employee.grossEarn}
                </td>

                <td className="px-6 py-4 text-right">
                  ${employee.received}
                </td>

                <td className="px-6 py-4 text-right">
                  ${employee.pending}
                </td>

                <td className="px-6 py-4 text-right font-semibold text-green-600">
                  ${employee.netProfit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}