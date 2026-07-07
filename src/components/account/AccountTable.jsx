"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

import { useApp } from "@/context/AppContext";
import SearchInput from "@/components/ui/SearchInput";

import toast from "react-hot-toast";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

export default function AccountTable({ onEdit }) {
   const {
    employees,
    accounts,
    performances,
    deleteAccount,
  } = useApp();
const [search, setSearch] = useState("");

const [openConfirm, setOpenConfirm] = useState(false);
const [selectedId, setSelectedId] = useState(null);

const handleDelete = (id) => {
  setSelectedId(id);
  setOpenConfirm(true);
};

const confirmDelete = () => {
  deleteAccount(selectedId);

  toast.success("Account deleted successfully");

  setOpenConfirm(false);
  setSelectedId(null);
};


  const filteredAccounts = accounts.filter((account) => {
    const employee = employees.find(
      (emp) => emp.id === account.employeeId
    );

    const employeeName = employee?.name || "";

    return (
      account.name.toLowerCase().includes(search.toLowerCase()) ||
      employeeName.toLowerCase().includes(search.toLowerCase())
    );
  });

  const calculateSummary = (accountId) => {
    const records = performances.filter(
      (item) => item.accountId === accountId
    );

   const connectCost = records.reduce(
  (sum, item) => sum + Number(item.connectCost || 0),
  0
);

const grossEarn = records.reduce(
  (sum, item) => sum + Number(item.grossEarn || 0),
  0
);

const received = records.reduce(
  (sum, item) => sum + Number(item.receivedAmount || 0),
  0
);

const pending = records.reduce(
  (sum, item) => sum + Number(item.pendingAmount || 0),
  0
);

    return {
      connectCost,
      grossEarn,
      received,
      pending,
      grossProfit: grossEarn - connectCost,
      netProfit: received - connectCost,
    };
  };


  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

      {/* Header */}
      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold">
          Accounts
        </h2>

        <p className="text-sm text-gray-500">
          Manage all employee accounts.
        </p>
      </div>

      {/* Search */}
      <div className="border-b p-4">
        <SearchInput
          placeholder="Search account..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-5 py-3 text-left">
                Employee
              </th>

              <th className="px-5 py-3 text-left">
                Account
              </th>

              <th className="px-5 py-3 text-left">
                Category
              </th>

              <th className="px-5 py-3 text-center">
                Status
              </th>

              <th className="px-5 py-3 text-right">
                Connect Cost
              </th>

              <th className="px-5 py-3 text-right">
                Gross Earn
              </th>

              <th className="px-5 py-3 text-right">
                Received
              </th>

              <th className="px-5 py-3 text-right">
                Pending
              </th>

              <th className="px-5 py-3 text-right">
                Gross Profit
              </th>

              <th className="px-5 py-3 text-right">
                Net Profit
              </th>

              <th className="px-5 py-3 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredAccounts.length === 0 ? (

              <tr>
                <td
                  colSpan={11}
                  className="py-8 text-center text-gray-500"
                >
                  No accounts found.
                </td>
              </tr>

            ) : (

              filteredAccounts.map((account) => {

                const employee = employees.find(
                  (emp) => emp.id === account.employeeId
                );

                const summary = calculateSummary(account.id);

                return (

                  <tr
                    key={account.id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-5 py-4">
                      {employee?.name}
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {account.name}
                    </td>

                    <td className="px-5 py-4">
                      {account.category}
                    </td>

                    <td className="px-5 py-4 text-center">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          account.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {account.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      ${summary.connectCost}
                    </td>

                    <td className="px-5 py-4 text-right">
                      ${summary.grossEarn}
                    </td>

                    <td className="px-5 py-4 text-right">
                      ${summary.received}
                    </td>

                    <td className="px-5 py-4 text-right">
                      ${summary.pending}
                    </td>

                    <td className="px-5 py-4 text-right font-semibold text-green-600">
                      ${summary.grossProfit}
                    </td>

                    <td className="px-5 py-4 text-right font-semibold text-blue-600">
                      ${summary.netProfit}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-center gap-3">

                        <Link
                          href={`/dashboard/accounts/${account.id}`}
                        >
                          <Eye
                            size={18}
                            className="cursor-pointer text-blue-600"
                          />
                        </Link>

                        <Pencil
                          size={18}
                          className="cursor-pointer text-green-600"
                          onClick={() => onEdit(account)}
                        />

                        <Trash2
                          size={18}
                          className="cursor-pointer text-red-600"
                          onClick={() =>
                            handleDelete(account.id)
                          }
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
<ConfirmDialog
  open={openConfirm}
  title="Delete Account"
  message="Are you sure you want to delete this account?"
  onConfirm={confirmDelete}
  onCancel={() => {
    setOpenConfirm(false);
    setSelectedId(null);
  }}
/>
    </div>
  );
}