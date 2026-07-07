"use client";

import { useMemo, useState } from "react";

import { useApp } from "@/context/AppContext";

import PageHeader from "@/components/ui/PageHeader";
import ReportFilters from "@/components/reports/ReportFilters";
import ReportSummary from "@/components/reports/ReportSummary";
import ReportTable from "@/components/reports/ReportTable";
import { exportReportToExcel } from "@/utils/exportExcel";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import PendingPayments from "@/components/dashboard/PendingPayments";
<div className="grid gap-6 lg:grid-cols-2">

    <RecentTransactions />

    <PendingPayments />

</div>

export default function ReportsPage() {
  const {
  performances,
  accounts,
  employees,
} = useApp();
<ReportFilters />

  const [filters, setFilters] = useState({
    employeeId: "",
    accountId: "",
    fromDate: "",
    toDate: "",
  });
  <div className="flex justify-end">
  <button
    onClick={() =>
      exportReportToExcel(
        filteredRecords,
        employees,
        accounts
      )
    }
    className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
  >
    Export Excel
  </button>
</div>


  const filteredRecords = useMemo(() => {
    return performances.filter((record) => {
      const account = accounts.find(
        (a) => a.id === record.accountId
      );

      if (!account) return false;

      // Employee Filter
      if (
        filters.employeeId &&
        account.employeeId !== Number(filters.employeeId)
      ) {
        return false;
      }

      // Account Filter
      if (
        filters.accountId &&
        record.accountId !== Number(filters.accountId)
      ) {
        return false;
      }

      // From Date
      if (
        filters.fromDate &&
        record.date < filters.fromDate
      ) {
        return false;
      }

      // To Date
      if (
        filters.toDate &&
        record.date > filters.toDate
      ) {
        return false;
      }

      return true;
    });
  }, [performances, accounts, filters]);

  return (
    <div className="space-y-6">

      <PageHeader
        title="Reports"
        description="Employee, Account and Financial Reports"
      />

      <ReportFilters
        filters={filters}
        setFilters={setFilters}
      />

      <ReportSummary records={filteredRecords} />

      <ReportTable records={filteredRecords} />

    </div>
  );
}