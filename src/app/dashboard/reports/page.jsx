"use client";

import { useMemo, useState } from "react";

import { useApp } from "@/context/AppContext";

import PageHeader from "@/components/ui/PageHeader";
import ReportFilters from "@/components/reports/ReportFilters";
import ReportSummary from "@/components/reports/ReportSummary";
import ReportTable from "@/components/reports/ReportTable";

export default function ReportsPage() {
  const { performances, accounts } = useApp();

  const [filters, setFilters] = useState({
    employeeId: "",
    accountId: "",
    month: "",
  });

  const filteredRecords = useMemo(() => {
    return performances.filter((record) => {
      const account = accounts.find(
        (a) => a.id === record.accountId
      );

      if (!account) return false;

      if (
        filters.employeeId &&
        account.employeeId !== Number(filters.employeeId)
      ) {
        return false;
      }

      if (
        filters.accountId &&
        record.accountId !== Number(filters.accountId)
      ) {
        return false;
      }

      if (
        filters.month &&
        record.month !== filters.month
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
        description="Employee & Account Monthly Reports"
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