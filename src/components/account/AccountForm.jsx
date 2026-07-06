"use client";

import { useEffect, useState } from "react";

import { useApp } from "@/context/AppContext";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function AccountForm({
  account = null,
  onSave,
  onCancel,
}) {
  const { employees } = useApp();

  const initialState = {
    employeeId: "",
    name: "",
    category: "",
    status: "Active",
  };

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (account) {
      setForm(account);
    } else {
      setForm(initialState);
    }
  }, [account]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "employeeId"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.employeeId) {
      alert("Please select an employee.");
      return;
    }

    if (!form.name.trim()) {
      alert("Account name is required.");
      return;
    }

    if (!form.category.trim()) {
      alert("Category is required.");
      return;
    }

    onSave(form);

    if (!account) {
      setForm(initialState);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div>
        <label className="mb-2 block text-sm font-medium">
          Employee
        </label>

        <select
          name="employeeId"
          value={form.employeeId}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        >
          <option value="">Select Employee</option>

          {employees.map((employee) => (
            <option
              key={employee.id}
              value={employee.id}
            >
              {employee.name}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="Account Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Graphic Designing"
      />

      <Input
        label="Category"
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Graphic Designing"
      />

      <div>
        <label className="mb-2 block text-sm font-medium">
          Status
        </label>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit">
          {account ? "Update Account" : "Save Account"}
        </Button>
      </div>

    </form>
  );
}