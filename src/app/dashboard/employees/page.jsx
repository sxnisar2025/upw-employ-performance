"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { useApp } from "@/context/AppContext";

import RoleGuard from "@/components/RoleGuard";
import PageHeader from "@/components/ui/PageHeader";
import Modal from "@/components/ui/Modal";
import EmployeeTable from "@/components/employee/EmployeeTable";
import EmployeeForm from "@/components/employee/EmployeeForm";

export default function EmployeesPage() {
  const { addEmployee, updateEmployee } = useApp();

  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const openAddModal = () => {
    setSelectedEmployee(null);
    setOpen(true);
  };

  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedEmployee(null);
  };

  const handleSave = async (employee) => {
  let success = false;

  if (employee.id) {
    success = await updateEmployee(employee);

    if (success) {
      toast.success("Employee updated successfully");
    }
  } else {
    success = await addEmployee(employee);

    if (success) {
      toast.success("Employee created successfully");
    }
  }

  if (success) {
    closeModal();
  }
};

  return (
    <RoleGuard adminOnly>
      <div className="space-y-6">

        <PageHeader
          title="Employees"
          description="Manage all employees."
        />

        <div className="flex justify-end">
          <button
            onClick={openAddModal}
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
          >
            + Add Employee
          </button>
        </div>

        <EmployeeTable onEdit={openEditModal} />

        <Modal
          open={open}
          onClose={closeModal}
          title={
            selectedEmployee
              ? "Edit Employee"
              : "Add Employee"
          }
        >
          <EmployeeForm
            employee={selectedEmployee}
            onSave={handleSave}
            onCancel={closeModal}
          />
        </Modal>

      </div>
    </RoleGuard>
  );
}