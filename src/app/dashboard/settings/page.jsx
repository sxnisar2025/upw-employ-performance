"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "@/context/AuthContext";
import { useApp } from "@/context/AppContext";

export default function SettingsPage() {
  const { user } = useAuth();
  const { employees } = useApp();

  // Admin password
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Employee password
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");
  const [loadingEmployee, setLoadingEmployee] = useState(false);

  // ==========================
  // Change Admin Password
  // ==========================

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("User not found.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/admin/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Admin password updated.");
      setPassword("");
    } else {
      toast.error(data.error || "Something went wrong.");
    }

    setLoading(false);
  };

  // ==========================
  // Reset Employee Password
  // ==========================

  const handleEmployeePassword = async (e) => {
    e.preventDefault();

    if (!selectedEmployee) {
      toast.error("Please select an employee.");
      return;
    }

    if (employeePassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoadingEmployee(true);

    const employee = employees.find(
      (emp) => emp.id === Number(selectedEmployee)
    );

    if (!employee?.auth_user_id) {
      toast.error("Employee has no Auth account.");
      setLoadingEmployee(false);
      return;
    }

    const res = await fetch("/api/admin/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: employee.auth_user_id,
        password: employeePassword,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Employee password updated.");
      setSelectedEmployee("");
      setEmployeePassword("");
    } else {
      toast.error(data.error || "Something went wrong.");
    }

    setLoadingEmployee(false);
  };

  return (
    <div className="max-w-2xl space-y-8">
      <h1 className="text-3xl font-bold">
        Settings
      </h1>

      {/* Admin Password */}

      <div className="rounded-xl border bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">
          Change Admin Password
        </h2>

        <form
          onSubmit={handleChangePassword}
          className="space-y-4"
        >
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border p-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-3 text-white"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>

      {/* Employee Password */}

      <div className="rounded-xl border bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">
          Reset Employee Password
        </h2>

        <form
          onSubmit={handleEmployeePassword}
          className="space-y-4"
        >
          <select
            value={selectedEmployee}
            onChange={(e) =>
              setSelectedEmployee(e.target.value)
            }
            className="w-full rounded-lg border p-3"
          >
            <option value="">
              Select Employee
            </option>

            {employees
              .filter(
                (emp) => emp.role !== "admin"
              )
              .map((emp) => (
                <option
                  key={emp.id}
                  value={emp.id}
                >
                  {emp.name}
                </option>
              ))}
          </select>

          <input
            type="password"
            placeholder="New Password"
            value={employeePassword}
            onChange={(e) =>
              setEmployeePassword(e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />

          <button
            type="submit"
            disabled={loadingEmployee}
            className="rounded-lg bg-red-600 px-5 py-3 text-white"
          >
            {loadingEmployee
              ? "Updating..."
              : "Reset Employee Password"}
          </button>
        </form>
      </div>
    </div>
  );
}