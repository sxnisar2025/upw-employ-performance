"use client";

import { useState, useEffect } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function EmployeeForm({
  employee = null,
  onSave,
  onCancel,
}) {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    status: "Active",
  };

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (employee) {
      setForm({
        name: employee.name || "",
        email: employee.email || "",
        phone: employee.phone || "",
        status: employee.status || "Active",
      });
    } else {
      setForm(initialState);
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Employee name is required.");
      return;
    }

    if (!form.email.trim()) {
      alert("Email is required.");
      return;
    }

    if (!form.phone.trim()) {
      alert("Phone number is required.");
      return;
    }

    const employeeData = {
      ...(employee && { id: employee.id }),
      ...form,
      joinedDate:
        employee?.joinedDate ||
        new Date().toISOString().split("T")[0],
    };

    onSave(employeeData);

    if (!employee) {
      setForm(initialState);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Employee Name"
        name="name"
        placeholder="Enter employee name"
        value={form.name}
        onChange={handleChange}
      />

      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Enter email"
        value={form.email}
        onChange={handleChange}
      />

      <Input
        label="Phone"
        name="phone"
        placeholder="Enter phone number"
        value={form.phone}
        onChange={handleChange}
      />

      <div>
        <label className="mb-2 block text-sm font-medium">
          Status
        </label>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
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
          {employee ? "Update Employee" : "Save Employee"}
        </Button>
      </div>
    </form>
  );
}