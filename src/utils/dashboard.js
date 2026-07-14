export function getDashboardStats(
  employees,
  accounts,
  performances
) {
  // Exclude Admin from employee count
  const totalEmployees = employees.filter(
    (employee) => employee.role !== "admin"
  ).length;

  const totalAccounts = accounts.length;

  const totalConnectCost = performances.reduce(
    (sum, item) => sum + Number(item.buy || 0),
    0
  );

  const totalGrossEarn = performances.reduce(
    (sum, item) => sum + Number(item.earn || 0),
    0
  );

  const totalReceived = performances.reduce(
    (sum, item) => sum + Number(item.received || 0),
    0
  );

  const totalPending = performances.reduce(
    (sum, item) => sum + Number(item.pending || 0),
    0
  );

  return {
    totalEmployees,
    totalAccounts,
    totalConnectCost,
    totalGrossEarn,
    totalReceived,
    totalPending,
    grossProfit: totalGrossEarn - totalConnectCost,
    netProfit: totalReceived - totalConnectCost,
  };
}