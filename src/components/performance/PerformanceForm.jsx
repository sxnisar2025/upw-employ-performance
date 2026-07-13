"use client";

import { useEffect, useState } from "react";

import { useApp } from "@/context/AppContext";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function PerformanceForm({
  performance = null,
  onSave,
  onCancel,
}) {
  const { accounts, employees } = useApp();

  const initialState = {
    accountId: "",
    month: "",
    buy: "",
    earn: "",
    received: "",
    pending: "",
  };

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (performance) {
      setForm({
        accountId: performance.accountId,
        month: performance.month,
        buy: performance.buy,
        earn: performance.earn,
        received: performance.received,
        pending: performance.pending,
      });
    } else {
      setForm(initialState);
    }
  }, [performance]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "accountId"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.accountId) {
      alert("Please select an account.");
      return;
    }

    if (!form.month) {
      alert("Please select a month.");
      return;
    }

    onSave({
      ...(performance && { id: performance.id }),
      accountId: Number(form.accountId),
      month: form.month,
      buy: Number(form.buy),
      earn: Number(form.earn),
      received: Number(form.received),
      pending: Number(form.pending),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div>
        <label className="mb-2 block font-medium">
          Account
        </label>

        <select
          name="accountId"
          value={form.accountId}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
        >
          <option value="">Select Account</option>

          {accounts
            .filter((account) => {
              const employee = employees.find(
                (e) => e.id === account.employeeId
              );

              // Hide Admin accounts
              return employee && employee.role !== "admin";
            })
            .map((account) => {
              const employee = employees.find(
                (e) => e.id === account.employeeId
              );

              return (
                <option
                  key={account.id}
                  value={account.id}
                >
                  {employee?.name} - {account.name}
                </option>
              );
            })}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Month
        </label>

        <select
          name="month"
          value={form.month}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
        >
          <option value="">Select Month</option>

          <option>January</option>
          <option>February</option>
          <option>March</option>
          <option>April</option>
          <option>May</option>
          <option>June</option>
          <option>July</option>
          <option>August</option>
          <option>September</option>
          <option>October</option>
          <option>November</option>
          <option>December</option>
        </select>
      </div>

      <Input
        label="Buy ($)"
        type="number"
        name="buy"
        value={form.buy}
        onChange={handleChange}
      />

      <Input
        label="Earn ($)"
        type="number"
        name="earn"
        value={form.earn}
        onChange={handleChange}
      />

      <Input
        label="Received ($)"
        type="number"
        name="received"
        value={form.received}
        onChange={handleChange}
      />

      <Input
        label="Pending ($)"
        type="number"
        name="pending"
        value={form.pending}
        onChange={handleChange}
      />

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit">
          {performance ? "Update Record" : "Save Record"}
        </Button>
      </div>

    </form>
  );
}