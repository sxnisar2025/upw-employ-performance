"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Eye } from "lucide-react";
import toast from "react-hot-toast";

import { useApp } from "@/context/AppContext";
import { calculateEmployeeSummary } from "@/utils/calculations";

import SearchInput from "@/components/ui/SearchInput";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Pagination from "@/components/ui/Pagination";

export default function EmployeeTable({ onEdit }) {
  const { employees, deleteEmployee } = useApp();

  const [search, setSearch] = useState("");
const [openConfirm, setOpenConfirm] = useState(false);
const [selectedId, setSelectedId] = useState(null);
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );
const [currentPage, setCurrentPage] = useState(1);

const itemsPerPage = 10;
const startIndex = (currentPage - 1) * itemsPerPage;

const paginatedEmployees = filteredEmployees.slice(
  startIndex,
  startIndex + itemsPerPage
);

const handleDelete = (id) => {
  setSelectedId(id);
  setOpenConfirm(true);
};

const confirmDelete = () => {
  deleteEmployee(selectedId);

  toast.success("Employee deleted successfully");

  setOpenConfirm(false);
  setSelectedId(null);
};


return (
  <>
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

      {/* Header */}
      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold">
          Employees
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Manage all employees and their performance.
        </p>
      </div>

      {/* Search */}
      <div className="border-b p-4">
        <SearchInput
          placeholder="Search employee..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">

          {/* Keep your THEAD exactly the same */}

          <tbody>

            {filteredEmployees.length === 0 ? (

              <tr>
                <td
                  colSpan={12}
                  className="py-8 text-center text-gray-500"
                >
                  No employee found.
                </td>
              </tr>

            ) : (

              paginatedEmployees.map((employee) => {
                const summary =
                  calculateEmployeeSummary(employee.id);

                return (
                  <tr
                    key={employee.id}
                    className="border-t hover:bg-gray-50"
                  >
                    {/* KEEP ALL YOUR EXISTING <td> COLUMNS HERE */}
                  </tr>
                );
              })

            )}

          </tbody>

        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(
          filteredEmployees.length / itemsPerPage
        )}
        onPageChange={setCurrentPage}
      />

    </div>

    <ConfirmDialog
      open={openConfirm}
      title="Delete Employee"
      message="Are you sure you want to delete this employee?"
      onConfirm={confirmDelete}
      onCancel={() => {
        setOpenConfirm(false);
        setSelectedId(null);
      }}
    />
  </>
);
}