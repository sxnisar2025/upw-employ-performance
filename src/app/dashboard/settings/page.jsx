"use client";

import PageHeader from "@/components/ui/PageHeader";

export default function SettingsPage() {
  return (
    <div className="space-y-6">

      <PageHeader
        title="Settings"
        description="Application Settings"
      />

      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <h2 className="mb-5 text-xl font-semibold">
          General Settings
        </h2>

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block">
              Company Name
            </label>

            <input
              className="w-full rounded-lg border p-3"
              defaultValue="Upwork Employee Record"
            />
          </div>

          <div>
            <label className="mb-2 block">
              Currency
            </label>

            <select className="w-full rounded-lg border p-3">
              <option>USD ($)</option>
              <option>PKR (Rs)</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block">
              Connect Price
            </label>

            <input
              type="number"
              className="w-full rounded-lg border p-3"
              defaultValue="0.15"
            />
          </div>

        </div>

        <button className="mt-6 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
          Save Settings
        </button>

      </div>

    </div>
  );
}