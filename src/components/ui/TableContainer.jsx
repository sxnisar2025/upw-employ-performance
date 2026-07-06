import Card from "./Card";

export default function TableContainer({
  title,
  children,
}) {
  return (
    <Card className="overflow-hidden">
      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold">
          {title}
        </h2>
      </div>

      <div className="overflow-x-auto">
        {children}
      </div>
    </Card>
  );
}