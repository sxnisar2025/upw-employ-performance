"use client";

import { useState } from "react";

import { useApp } from "@/context/AppContext";

import PageHeader from "@/components/ui/PageHeader";
import Modal from "@/components/ui/Modal";

import AccountTable from "@/components/account/AccountTable";
import AccountForm from "@/components/account/AccountForm";

export default function AccountsPage() {
  const { addAccount, updateAccount } = useApp();

  const [open, setOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const openAddModal = () => {
    setSelectedAccount(null);
    setOpen(true);
  };

  const openEditModal = (account) => {
    setSelectedAccount(account);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedAccount(null);
  };

  const handleSave = (account) => {
    if (account.id) {
      updateAccount(account);
    } else {
      addAccount(account);
    }

    closeModal();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Accounts"
        description="Manage employee Upwork accounts."
      />

      <div className="flex justify-end">
        <button
          onClick={openAddModal}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          + Add Account
        </button>
      </div>

      <AccountTable onEdit={openEditModal} />

      <Modal
        open={open}
        onClose={closeModal}
        title={selectedAccount ? "Edit Account" : "Add Account"}
      >
        <AccountForm
          account={selectedAccount}
          onSave={handleSave}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}