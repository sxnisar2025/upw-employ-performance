import Link from "next/link";

export default function AccountCard({ account, employeeId }) {
  const grossProfit = account.earn - account.buy;
  const netProfit = account.received - account.buy;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold">{account.name}</h3>

          <p className="mt-1 text-sm text-gray-500">
            Upwork Account
          </p>
        </div>

        <Link
          href={`/dashboard/accounts/${account.id}`}
          className="text-blue-600 hover:underline"
        >
          View Performance →
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">

        <div>
          <p className="text-sm text-gray-500">Connect Cost</p>
          <p className="font-semibold">${account.buy}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Gross Earn</p>
          <p className="font-semibold">${account.earn}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Received</p>
          <p className="font-semibold">${account.received}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Pending</p>
          <p className="font-semibold">${account.pending}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Gross Profit</p>
          <p className="font-semibold text-green-600">
            ${grossProfit}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Net Profit</p>
          <p className="font-semibold text-green-600">
            ${netProfit}
          </p>
        </div>

      </div>
    </div>
  );
}