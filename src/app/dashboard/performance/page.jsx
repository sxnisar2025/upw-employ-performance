"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";

import PageHeader from "@/components/ui/PageHeader";
import Modal from "@/components/ui/Modal";

import PerformanceTable from "@/components/performance/PerformanceTable";
import PerformanceForm from "@/components/performance/PerformanceForm";
import ReportFilters from "@/components/reports/ReportFilters";

export default function PerformancePage() {
  const {
    addPerformance,
    updatePerformance,
    performances,
    accounts,
  } = useApp();

  const { employee } = useAuth();

  const isAdmin = employee?.role === "admin";

  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [filters, setFilters] = useState({
    employeeId: "",
    accountId: "",
    month: "",
  });

  const openAddModal = () => {
    setSelectedRecord(null);
    setOpen(true);
  };

  const openEditModal = (record) => {
    setSelectedRecord(record);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedRecord(null);
  };

  const filteredPerformances = useMemo(() => {
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

      // Month Filter
      if (
        filters.month &&
        record.month !== filters.month
      ) {
        return false;
      }

      return true;
    });
  }, [performances, accounts, filters]);

  const handleSave = async (record) => {
    let success;

    if (record.id) {
      success = await updatePerformance(record);

      if (success !== false) {
        toast.success("Performance record updated successfully");
      }
    } else {
      success = await addPerformance(record);

      if (success !== false) {
        toast.success("Performance record added successfully");
      }
    }

    if (success !== false) {
      closeModal();
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Performance Records"
        description="Manage employee account earnings and connect costs."
      />

      {isAdmin && (
        <div className="flex justify-end">
          <button
            onClick={openAddModal}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            + Add Performance
          </button>
        </div>
      )}

      <ReportFilters
        filters={filters}
        setFilters={setFilters}
      />

      <PerformanceTable
        data={filteredPerformances}
        onEdit={openEditModal}
      />

      <Modal
        open={open}
        onClose={closeModal}
        title={
          selectedRecord
            ? "Edit Performance"
            : "Add Performance"
        }
      >
        <PerformanceForm
          performance={selectedRecord}
          onSave={handleSave}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}