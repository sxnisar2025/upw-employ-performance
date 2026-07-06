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
    date: "",
    connectCost: "",
    grossEarn: "",
    receivedAmount: "",
    pendingAmount: "",
    notes: "",
  };

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (performance) {
      setForm(performance);
    } else {
      setForm({
        ...initialState,
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, [performance]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === "accountId"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.accountId) {
      alert("Select account");
      return;
    }

    onSave({
      ...form,
      connectCost: Number(form.connectCost),
      grossEarn: Number(form.grossEarn),
      receivedAmount: Number(form.receivedAmount),
      pendingAmount: Number(form.pendingAmount),
    });

    if (!performance) {
      setForm({
        ...initialState,
        date: new Date().toISOString().split("T")[0],
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
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

          {accounts.map((account) => {
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

      <Input
        label="Date"
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />

      <Input
        label="Connect Cost ($)"
        type="number"
        name="connectCost"
        value={form.connectCost}
        onChange={handleChange}
      />

      <Input
        label="Gross Earn ($)"
        type="number"
        name="grossEarn"
        value={form.grossEarn}
        onChange={handleChange}
      />

      <Input
        label="Received Amount ($)"
        type="number"
        name="receivedAmount"
        value={form.receivedAmount}
        onChange={handleChange}
      />

      <Input
        label="Pending Amount ($)"
        type="number"
        name="pendingAmount"
        value={form.pendingAmount}
        onChange={handleChange}
      />

      <div>
        <label className="mb-2 block font-medium">
          Notes
        </label>

        <textarea
          rows="4"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit">
          {performance
            ? "Update Record"
            : "Save Record"}
        </Button>
      </div>
    </form>
  );
}