export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8">
      <div>
        <h2 className="text-xl font-semibold">
          Upwork Employee Record
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-medium">Admin</p>
          <p className="text-sm text-gray-500">
            administrator
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
          A
        </div>
      </div>
    </header>
  );
}