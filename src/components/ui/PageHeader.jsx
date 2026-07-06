import Button from "./Button";

export default function PageHeader({
  title,
  description,
  buttonText,
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>

        <p className="mt-1 text-gray-500">
          {description}
        </p>
      </div>

      {buttonText && (
        <Button>
          + {buttonText}
        </Button>
      )}
    </div>
  );
}