"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { useApp } from "@/context/AppContext";

import PageHeader from "@/components/ui/PageHeader";
import Modal from "@/components/ui/Modal";

import PerformanceTable from "@/components/performance/PerformanceTable";
import PerformanceForm from "@/components/performance/PerformanceForm";

export default function PerformancePage() {
  const {
    addPerformance,
    updatePerformance,
  } = useApp();

  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

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

  const handleSave = (record) => {
    if (record.id) {
      updatePerformance(record);

      toast.success("Performance record updated successfully");
    } else {
      addPerformance({
        id: Date.now(),
        ...record,
      });

      toast.success("Performance record added successfully");
    }

    closeModal();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Performance Records"
        description="Manage employee account earnings and connect costs."
      />

      <div className="flex justify-end">
        <button
          onClick={openAddModal}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          + Add Performance
        </button>
      </div>

      <PerformanceTable onEdit={openEditModal} />

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