export default function Select({
  label,
  options,
  ...props
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        {label}
      </label>

      <select
        {...props}
        className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
      >
        {options.map((item) => (
          <option
            key={item.value}
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}