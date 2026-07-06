export function getDashboardStats(
  employees,
  accounts,
  performances
) {
  const totalEmployees = employees.length;
  const totalAccounts = accounts.length;

  const totalConnectCost = performances.reduce(
    (sum, item) => sum + Number(item.connectCost || 0),
    0
  );

  const totalGrossEarn = performances.reduce(
    (sum, item) => sum + Number(item.grossEarn || 0),
    0
  );

  const totalReceived = performances.reduce(
    (sum, item) => sum + Number(item.receivedAmount || 0),
    0
  );

  const totalPending = performances.reduce(
    (sum, item) => sum + Number(item.pendingAmount || 0),
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