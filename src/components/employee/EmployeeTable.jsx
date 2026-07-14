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
  const [currentPage, setCurrentPage] = useState(1);

  // Hide Admin user
  const employeeList = employees.filter(
    (employee) => employee.role !== "admin"
  );

  // Search
  const filteredEmployees = employeeList.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

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

            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">
                  Employee
                </th>

                <th className="px-6 py-3 text-left">
                  Email
                </th>

                <th className="px-6 py-3 text-left">
                  Phone
                </th>

                <th className="px-6 py-3 text-center">
                  Status
                </th>

                <th className="px-6 py-3 text-center">
                  Accounts
                </th>

                <th className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>

              {filteredEmployees.length === 0 ? (

                <tr>
                  <td
                    colSpan={6}
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

                      <td className="px-6 py-4 font-medium">
                        {employee.name}
                      </td>

                      <td className="px-6 py-4">
                        {employee.email}
                      </td>

                      <td className="px-6 py-4">
                        {employee.phone}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            employee.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {employee.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        {summary.accounts}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-4">

                          <Link
                            href={`/dashboard/employees/${employee.id}`}
                          >
                            <Eye
                              size={18}
                              className="cursor-pointer text-blue-600 hover:text-blue-800"
                            />
                          </Link>

                          <Pencil
                            size={18}
                            onClick={() => onEdit(employee)}
                            className="cursor-pointer text-green-600 hover:text-green-800"
                          />

                          <Trash2
                            size={18}
                            onClick={() =>
                              handleDelete(employee.id)
                            }
                            className="cursor-pointer text-red-600 hover:text-red-800"
                          />

                        </div>
                      </td>

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