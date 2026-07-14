"use client";

export default function DashboardFilters({
  employees,
  accounts,
  employeeFilter,
  accountFilter,
  monthFilter,
  setEmployeeFilter,
  setAccountFilter,
  setMonthFilter,
}) {
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

  // Hide Admin from employee dropdown
  const employeeList = employees.filter(
    (employee) => employee.role !== "admin"
  );

  // Show only accounts of selected employee
  const filteredAccounts = employeeFilter
    ? accounts.filter(
        (account) =>
          String(account.employeeId) === String(employeeFilter)
      )
    : accounts;

  return (
    <div className="rounded-xl bg-white border shadow-sm p-5 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Employee */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Employee
          </label>

          <select
            value={employeeFilter}
            onChange={(e) => {
              setEmployeeFilter(e.target.value);
              setAccountFilter("");
            }}
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
          >
            <option value="">All Employees</option>

            {employeeList.map((employee) => (
              <option
                key={employee.id}
                value={employee.id}
              >
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        {/* Account */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Account
          </label>

          <select
            value={accountFilter}
            onChange={(e) =>
              setAccountFilter(e.target.value)
            }
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
          >
            <option value="">All Accounts</option>

            {filteredAccounts.map((account) => (
              <option
                key={account.id}
                value={account.id}
              >
                {account.name}
              </option>
            ))}
          </select>
        </div>

        {/* Month */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Month
          </label>

          <select
            value={monthFilter}
            onChange={(e) =>
              setMonthFilter(e.target.value)
            }
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
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

      </div>
    </div>
  );
}