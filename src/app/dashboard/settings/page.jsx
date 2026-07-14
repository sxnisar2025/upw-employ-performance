"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {
  const { user } = useAuth();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
      toast.success("Password updated successfully.");
      setPassword("");
    } else {
      toast.error(data.error || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-3xl font-bold">
        Settings
      </h1>

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
            className="w-full rounded-lg border p-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
    </div>
  );
}