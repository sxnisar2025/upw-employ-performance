"use client";

export default function ReportSummary({ records = [] }) {
  const summary = records.reduce(
    (acc, item) => {
      acc.connectCost += Number(item.connectCost || 0);
      acc.grossEarn += Number(item.grossEarn || 0);
      acc.received += Number(item.receivedAmount || 0);
      acc.pending += Number(item.pendingAmount || 0);

      return acc;
    },
    {
      connectCost: 0,
      grossEarn: 0,
      received: 0,
      pending: 0,
    }
  );

  const grossProfit =
    summary.grossEarn - summary.connectCost;

  const netProfit =
    summary.received - summary.connectCost;

  const cards = [
    {
      title: "Connect Cost",
      value: `$${summary.connectCost}`,
      color: "text-red-600",
    },
    {
      title: "Gross Earn",
      value: `$${summary.grossEarn}`,
      color: "text-green-600",
    },
    {
      title: "Received",
      value: `$${summary.received}`,
      color: "text-blue-600",
    },
    {
      title: "Pending",
      value: `$${summary.pending}`,
      color: "text-orange-600",
    },
    {
      title: "Gross Profit",
      value: `$${grossProfit}`,
      color: "text-emerald-700",
    },
    {
      title: "Net Profit",
      value: `$${netProfit}`,
      color: "text-indigo-700",
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border bg-white p-5 shadow-sm"
        >
          <p className="text-sm text-gray-500">
            {card.title}
          </p>

          <h2
            className={`mt-3 text-2xl font-bold ${card.color}`}
          >
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}