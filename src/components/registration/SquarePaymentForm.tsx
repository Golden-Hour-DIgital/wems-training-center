"use client";

import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { Spinner } from "@/components/ui/Spinner";

interface Props {
  amount: number;
  onTokenize: (token: string) => void;
  loading: boolean;
}

export function SquarePaymentForm({ amount, onTokenize, loading }: Props) {
  if (!process.env.NEXT_PUBLIC_SQUARE_APP_ID || !process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID) {
    return (
      <div className="rounded-lg border border-gold-200 bg-gold-50 p-4 text-sm text-gold-800">
        Payment system is not configured. Please contact us to register.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-navy-900">Payment Details</h2>
      <p className="text-sm text-gray-600">
        Your card will be charged{" "}
        <span className="font-semibold">
          ${(amount / 100).toFixed(2)}
        </span>
      </p>

      {loading ? (
        <div className="flex flex-col items-center gap-3 py-8">
          <Spinner size="lg" />
          <p className="text-sm text-gray-600">Processing payment...</p>
        </div>
      ) : (
        <PaymentForm
          applicationId={process.env.NEXT_PUBLIC_SQUARE_APP_ID}
          locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID}
          cardTokenizeResponseReceived={(token) => {
            if (token.status === "OK" && token.token) {
              onTokenize(token.token);
            }
          }}
          createVerificationDetails={() => ({
            amount: (amount / 100).toFixed(2),
            currencyCode: "USD",
            intent: "CHARGE",
            billingContact: {},
          })}
        >
          <CreditCard />
        </PaymentForm>
      )}
    </div>
  );
}
