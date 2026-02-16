"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { RegistrationForm } from "@/components/registration/RegistrationForm";
import { SquarePaymentForm } from "@/components/registration/SquarePaymentForm";
import { PaymentSummary } from "@/components/registration/PaymentSummary";
import { RegistrationSuccess } from "@/components/registration/RegistrationSuccess";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { registrationSchema } from "@/lib/utils/validation";
import type { RegistrationFormData } from "@/lib/utils/validation";
import type { Class } from "@/types/database";

type Step = "form" | "payment" | "success";

interface Props {
  classData: Class;
}

export function RegistrationPageClient({ classData }: Props) {
  const [step, setStep] = useState<Step>("form");
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "PA",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);

  const handleFormSubmit = () => {
    const result = registrationSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string") {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setError(null);
    setStep("payment");
  };

  const handlePayment = async (token: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceId: token,
          classId: classData.id,
          studentInfo: formData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setReceiptUrl(data.receiptUrl);
        setStep("success");
      } else {
        setError(data.error || "Payment failed. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { key: "form", label: "Student Info" },
    { key: "payment", label: "Payment" },
    { key: "success", label: "Confirmation" },
  ];

  const currentIndex = steps.findIndex((s) => s.key === step);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href={`/classes/${classData.slug}`}
        className="inline-flex items-center gap-1 text-sm text-navy-600 hover:text-navy-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Class Details
      </Link>

      <h1 className="text-2xl font-bold text-navy-900 mb-8">
        Register for {classData.title}
      </h1>

      {/* Step indicator */}
      <div className="mb-10 flex items-center justify-center gap-2">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                i <= currentIndex
                  ? "bg-navy-700 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-sm hidden sm:inline ${
                i <= currentIndex
                  ? "font-medium text-navy-900"
                  : "text-gray-500"
              }`}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <div
                className={`mx-2 h-0.5 w-8 sm:w-16 ${
                  i < currentIndex ? "bg-navy-700" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {error && (
        <Alert variant="error" className="mb-6">
          {error}
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {step === "form" && (
            <RegistrationForm
              data={formData}
              onChange={setFormData}
              onSubmit={handleFormSubmit}
              errors={errors}
            />
          )}

          {step === "payment" && (
            <div className="space-y-4">
              <Button
                variant="ghost"
                onClick={() => setStep("form")}
                className="mb-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Student Info
              </Button>
              <SquarePaymentForm
                amount={classData.price_cents}
                onTokenize={handlePayment}
                loading={loading}
              />
            </div>
          )}

          {step === "success" && (
            <RegistrationSuccess
              className={classData.title}
              receiptUrl={receiptUrl}
            />
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <PaymentSummary classData={classData} />
          </div>
        </div>
      </div>
    </div>
  );
}
