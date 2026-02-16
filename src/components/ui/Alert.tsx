import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

const variantStyles: Record<AlertVariant, string> = {
  info: "bg-navy-50 border-navy-200 text-navy-800",
  success: "bg-green-50 border-green-200 text-green-800",
  warning: "bg-gold-50 border-gold-200 text-gold-800",
  error: "bg-accent-50 border-accent-200 text-accent-800",
};

export function Alert({ className, variant = "info", ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-lg border p-4 text-sm",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
