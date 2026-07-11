"use client";

import { useState } from "react";

import { useApp } from "@/context/AppContext";
import { getDashboardStats } from "@/utils/dashboard";

import DashboardFilters from "@/components/dashboard/DashboardFilters";
import StatCard from "@/components/dashboard/StatCard";

export default function DashboardPage() {
  const {
    employees,
    accounts,
    performances,
  } = useApp();

  // Filters
  const [employeeFilter, setEmployeeFilter] = useState("");
  const [accountFilter, setAccountFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");

  // Filter performance records
  const filteredPerformance = performances.filter((item) => {
    const account = accounts.find(
      (a) => a.id === item.accountId
    );

    const employeeId = account?.employeeId;

 const itemMonth = item.month || "";

    return (
      (!employeeFilter ||
        String(employeeId) === String(employeeFilter)) &&

      (!accountFilter ||
        String(item.accountId) === String(accountFilter)) &&

      (!monthFilter || itemMonth === monthFilter)
    );
  });

  // Dashboard statistics
  const stats = getDashboardStats(
    employees,
    accounts,
    filteredPerformance
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

      <DashboardFilters
        employees={employees}
        accounts={accounts}
        employeeFilter={employeeFilter}
        accountFilter={accountFilter}
        monthFilter={monthFilter}
        setEmployeeFilter={setEmployeeFilter}
        setAccountFilter={setAccountFilter}
        setMonthFilter={setMonthFilter}
      />

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