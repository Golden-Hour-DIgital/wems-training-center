import { format, formatDistanceToNow } from "date-fns";

export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function formatDate(date: string | Date): string {
  return format(new Date(date), "MMMM d, yyyy");
}

export function formatDateTime(date: string | Date): string {
  return format(new Date(date), "MMMM d, yyyy 'at' h:mm a");
}

export function formatDateShort(date: string | Date): string {
  return format(new Date(date), "MMM d, yyyy");
}

export function formatRelative(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}
