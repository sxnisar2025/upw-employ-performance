export default function Input({
  label,
  ...props
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
      />
    </div>
  );
}