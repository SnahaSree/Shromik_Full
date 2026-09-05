interface LoadingProps {
  label?: string;
}

export default function Loading({
  label = "Loading...",
}: LoadingProps) {
  return (
    <div
      className="flex min-h-40 items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <span
          className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-green-800"
          aria-hidden="true"
        />
        <span className="text-sm text-slate-600">
          {label}
        </span>
      </div>
    </div>
  );
}