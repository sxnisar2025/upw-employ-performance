export default function SearchInput({
  placeholder = "Search...",
  value,
  onChange,
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
    />
  );
}