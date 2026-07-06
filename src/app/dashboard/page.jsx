"use client";

import { useApp } from "@/context/AppContext";
import { getDashboardStats } from "@/utils/dashboard";
import StatCard from "@/components/dashboard/StatCard";

export default function DashboardPage() {
  const {
    employees,
    accounts,
    performances,
  } = useApp();

  const stats = getDashboardStats(
    employees,
    accounts,
    performances
  );

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Upwork Employee Management Dashboard
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Employees"
          value={stats.totalEmployees}
        />

        <StatCard
          title="Accounts"
          value={stats.totalAccounts}
        />

        <StatCard
          title="Connect Cost"
          value={`$${stats.totalConnectCost}`}
        />

        <StatCard
          title="Gross Earn"
          value={`$${stats.totalGrossEarn}`}
        />

        <StatCard
          title="Received"
          value={`$${stats.totalReceived}`}
        />

        <StatCard
          title="Pending"
          value={`$${stats.totalPending}`}
        />

        <StatCard
          title="Gross Profit"
          value={`$${stats.grossProfit}`}
        />

        <StatCard
          title="Net Profit"
          value={`$${stats.netProfit}`}
        />

      </div>

    </div>
  );
}