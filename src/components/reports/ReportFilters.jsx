"use client";

import { useApp } from "@/context/AppContext";

export default function ReportFilters({
  filters,
  setFilters,
}) {
  const { employees, accounts } = useApp();

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="grid gap-4 rounded-xl border bg-white p-5 md:grid-cols-4">

      <div>
        <label className="mb-2 block text-sm font-medium">
          Employee
        </label>

        <select
          name="employeeId"
          value={filters.employeeId}
          onChange={handleChange}
          className="w-full rounded-lg border p-2"
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
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Account
        </label>

        <select
          name="accountId"
          value={filters.accountId}
          onChange={handleChange}
          className="w-full rounded-lg border p-2"
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
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          From Date
        </label>

        <input
          type="date"
          name="fromDate"
          value={filters.fromDate}
          onChange={handleChange}
          className="w-full rounded-lg border p-2"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          To Date
        </label>

        <input
          type="date"
          name="toDate"
          value={filters.toDate}
          onChange={handleChange}
          className="w-full rounded-lg border p-2"
        />
      </div>

    </div>
  );
}