"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function EmployeeForm({
  employee = null,
  onSave,
  onCancel,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const initialState = {
    name: "",
    email: "",
    phone: "",
    role: "employee",
    status: "Active",
    password: "",
  };

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (employee) {
      setForm({
        name: employee.name || "",
        email: employee.email || "",
        phone: employee.phone || "",
        role: employee.role || "employee",
        status: employee.status || "Active",
        password: "",
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

    if (!employee && form.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    const employeeData = {
      ...(employee && { id: employee.id }),
      ...form,
    };

    onSave(employeeData);

    if (!employee) {
      setForm(initialState);
      setShowPassword(false);
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
        <label className="block mb-2 text-sm font-medium">
          Role
        </label>

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {!employee && (
        <div>
          <label className="block mb-2 text-sm font-medium">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-12 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>
      )}

      <div>
        <label className="block mb-2 text-sm font-medium">
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