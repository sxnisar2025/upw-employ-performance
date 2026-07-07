"use client";

export default function AccountSummary({ records }) {
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

  return (
    <div className="grid gap-4 md:grid-cols-3">

      <Card
        title="Connect Cost"
        value={summary.connectCost}
      />

      <Card
        title="Gross Earn"
        value={summary.grossEarn}
      />

      <Card
        title="Received"
        value={summary.received}
      />

      <Card
        title="Pending"
        value={summary.pending}
      />

      <Card
        title="Gross Profit"
        value={
          summary.grossEarn -
          summary.connectCost
        }
      />

      <Card
        title="Net Profit"
        value={
          summary.received -
          summary.connectCost
        }
      />

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold">
        ${value}
      </h2>
    </div>
  );
}