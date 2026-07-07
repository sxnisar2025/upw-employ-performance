export function calculateAnalytics(performances) {
  const connectCost = performances.reduce(
    (sum, item) => sum + Number(item.connectCost || 0),
    0
  );

  const grossEarn = performances.reduce(
    (sum, item) => sum + Number(item.grossEarn || 0),
    0
  );

  const received = performances.reduce(
    (sum, item) => sum + Number(item.receivedAmount || 0),
    0
  );

  const pending = performances.reduce(
    (sum, item) => sum + Number(item.pendingAmount || 0),
    0
  );

  const jobs = performances.length;

  const grossProfit = grossEarn - connectCost;
  const netProfit = received - connectCost;

  const roi =
    connectCost > 0
      ? ((netProfit / connectCost) * 100).toFixed(2)
      : 0;

  return {
    jobs,
    connectCost,
    grossEarn,
    received,
    pending,
    grossProfit,
    netProfit,
    roi,
  };
}