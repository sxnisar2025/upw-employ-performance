export default function StatCard({
  title,
  value,
}) {
  return (
    <div className="rounded-xl bg-white border shadow-sm p-6">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold">
        {value}
      </h2>
    </div>
  );
}