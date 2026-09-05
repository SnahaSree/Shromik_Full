import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger"
  | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-green-800 text-white hover:bg-green-900",
  secondary:
    "bg-amber-500 text-white hover:bg-amber-600",
  outline:
    "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50",
  danger:
    "bg-red-600 text-white hover:bg-red-700",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100",
};

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center gap-2",
        "rounded-lg px-5 py-3",
        "text-sm font-semibold",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2",
        "focus:ring-green-700 focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}