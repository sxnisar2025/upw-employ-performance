import accounts from "@/data/accounts";
import performances from "@/data/performances";

/**
 * Calculate totals for a single account
 */
export function calculateAccountSummary(accountId) {
  const records = performances.filter(
    (item) => item.accountId === accountId
  );

  const connectCost = records.reduce((sum, item) => sum + item.buy, 0);

  const grossEarn = records.reduce((sum, item) => sum + item.earn, 0);

  const received = records.reduce((sum, item) => sum + item.received, 0);

  const pending = records.reduce((sum, item) => sum + item.pending, 0);

  return {
    connectCost,
    grossEarn,
    received,
    pending,
    grossProfit: grossEarn - connectCost,
    netProfit: received - connectCost,
  };
}

/**
 * Calculate totals for one employee
 */
export function calculateEmployeeSummary(employeeId) {
  const employeeAccounts = accounts.filter(
    (account) => account.employeeId === employeeId
  );

  const summary = {
    accounts: employeeAccounts.length,
    connectCost: 0,
    grossEarn: 0,
    received: 0,
    pending: 0,
    grossProfit: 0,
    netProfit: 0,
  };

  employeeAccounts.forEach((account) => {
    const accountSummary = calculateAccountSummary(account.id);

    summary.connectCost += accountSummary.connectCost;
    summary.grossEarn += accountSummary.grossEarn;
    summary.received += accountSummary.received;
    summary.pending += accountSummary.pending;
    summary.grossProfit += accountSummary.grossProfit;
    summary.netProfit += accountSummary.netProfit;
  });

  return summary;
}

/**
 * Calculate totals for the entire dashboard
 */
export function calculateDashboardSummary(employees) {
  const summary = {
    employees: employees.length,
    accounts: accounts.length,
    connectCost: 0,
    grossEarn: 0,
    received: 0,
    pending: 0,
    grossProfit: 0,
    netProfit: 0,
  };

  employees.forEach((employee) => {
    const employeeSummary = calculateEmployeeSummary(employee.id);

    summary.connectCost += employeeSummary.connectCost;
    summary.grossEarn += employeeSummary.grossEarn;
    summary.received += employeeSummary.received;
    summary.pending += employeeSummary.pending;
    summary.grossProfit += employeeSummary.grossProfit;
    summary.netProfit += employeeSummary.netProfit;
  });

  return summary;
}