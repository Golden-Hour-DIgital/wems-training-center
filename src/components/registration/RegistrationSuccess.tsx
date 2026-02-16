import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Props {
  className: string;
  receiptUrl: string | null;
}

export function RegistrationSuccess({ className, receiptUrl }: Props) {
  return (
    <div className="text-center py-8">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-navy-900">
        Registration Confirmed!
      </h2>

      <p className="mt-3 text-gray-600 max-w-md mx-auto">
        You have been successfully registered for{" "}
        <span className="font-semibold">{className}</span>. A confirmation
        email will be sent shortly.
      </p>

      {receiptUrl && (
        <a
          href={receiptUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm text-navy-600 hover:text-navy-800 underline"
        >
          View Payment Receipt
        </a>
      )}

      <div className="mt-8">
        <Link href="/classes">
          <Button variant="outline">Browse More Classes</Button>
        </Link>
      </div>
    </div>
  );
}
