"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { contactSchema } from "@/lib/utils/validation";
import type { ContactFormData } from "@/lib/utils/validation";

export function ContactFormClient() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = contactSchema.safeParse(formData);
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
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Alert variant="success">
        <p className="font-medium">Message sent!</p>
        <p className="mt-1">
          Thank you for reaching out. We&apos;ll get back to you as soon as
          possible.
        </p>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert variant="error">{error}</Alert>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="name"
          label="Name *"
          value={formData.name}
          onChange={(e) => update("name", e.target.value)}
          error={errors.name}
          required
        />
        <Input
          id="email"
          label="Email *"
          type="email"
          value={formData.email}
          onChange={(e) => update("email", e.target.value)}
          error={errors.email}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="phone"
          label="Phone"
          type="tel"
          value={formData.phone || ""}
          onChange={(e) => update("phone", e.target.value)}
        />
        <Input
          id="subject"
          label="Subject"
          value={formData.subject || ""}
          onChange={(e) => update("subject", e.target.value)}
        />
      </div>

      <Textarea
        id="message"
        label="Message *"
        value={formData.message}
        onChange={(e) => update("message", e.target.value)}
        error={errors.message}
        rows={6}
        required
      />

      <Button type="submit" size="lg" disabled={loading} className="w-full">
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
