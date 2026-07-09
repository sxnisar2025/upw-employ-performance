"use client";

import { useApp } from "@/context/AppContext";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ReportFilters({
  filters,
  setFilters,
}) {
  const { employees, accounts } = useApp();

  return (
    <div className="grid gap-4 rounded-lg bg-white p-4 shadow md:grid-cols-3">

      {/* Employee */}

      <select
        value={filters.employeeId}
        onChange={(e) =>
          setFilters({
            ...filters,
            employeeId: e.target.value,
          })
        }
        className="rounded-lg border p-2"
      >
        <option value="">All Employees</option>

        {employees.map((employee) => (
          <option
            key={employee.id}
            value={employee.id}
          >
            {employee.name}
          </option>
        ))}
      </select>

      {/* Account */}

      <select
        value={filters.accountId}
        onChange={(e) =>
          setFilters({
            ...filters,
            accountId: e.target.value,
          })
        }
        className="rounded-lg border p-2"
      >
        <option value="">All Accounts</option>

        {accounts.map((account) => (
          <option
            key={account.id}
            value={account.id}
          >
            {account.name}
          </option>
        ))}
      </select>

      {/* Month */}

      <select
        value={filters.month}
        onChange={(e) =>
          setFilters({
            ...filters,
            month: e.target.value,
          })
        }
        className="rounded-lg border p-2"
      >
        <option value="">All Months</option>

        {months.map((month) => (
          <option
            key={month}
            value={month}
          >
            {month}
          </option>
        ))}
      </select>
    </div>
  );
}