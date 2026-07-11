const { employees, accounts, performances } = useApp();
import { calculateDashboardSummary } from "@/utils/calculations";

import StatCard from "./StatCard";

export default function DashboardCards() {
  const summary = calculateDashboardSummary(employees);

  const cards = [
    {
      title: "Employees",
      value: summary.employees,
      icon: "employees",
    },
    {
      title: "Accounts",
      value: summary.accounts,
      icon: "accounts",
    },
    {
      title: "Gross Earn",
      value: `$${summary.grossEarn}`,
      icon: "gross",
    },
    {
      title: "Received",
      value: `$${summary.received}`,
      icon: "received",
    },
    {
      title: "Pending",
      value: `$${summary.pending}`,
      icon: "pending",
    },
    {
      title: "Connect Cost",
      value: `$${summary.connectCost}`,
      icon: "connect",
    },
    {
      title: "Gross Profit",
      value: `$${summary.grossProfit}`,
      icon: "grossProfit",
    },
    {
      title: "Net Profit",
      value: `$${summary.netProfit}`,
      icon: "netProfit",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <StatCard
          key={card.title}
          title={card.title}
          value={card.value}
          icon={card.icon}
        />
      ))}
    </div>
  );
}