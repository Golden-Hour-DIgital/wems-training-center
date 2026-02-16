"use client";

import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import type { RegistrationFormData } from "@/lib/utils/validation";

interface Props {
  data: RegistrationFormData;
  onChange: (data: RegistrationFormData) => void;
  onSubmit: () => void;
  errors: Record<string, string>;
}

export function RegistrationForm({ data, onChange, onSubmit, errors }: Props) {
  const update = (field: keyof RegistrationFormData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-navy-900 mb-4">
          Student Information
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            id="firstName"
            label="First Name *"
            value={data.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            error={errors.firstName}
            required
          />
          <Input
            id="lastName"
            label="Last Name *"
            value={data.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            error={errors.lastName}
            required
          />
          <Input
            id="email"
            label="Email *"
            type="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            error={errors.email}
            required
          />
          <Input
            id="phone"
            label="Phone *"
            type="tel"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            error={errors.phone}
            required
          />
          <Input
            id="dateOfBirth"
            label="Date of Birth"
            type="date"
            value={data.dateOfBirth || ""}
            onChange={(e) => update("dateOfBirth", e.target.value)}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-navy-900 mb-4">Address</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input
              id="addressLine1"
              label="Street Address"
              value={data.addressLine1 || ""}
              onChange={(e) => update("addressLine1", e.target.value)}
            />
          </div>
          <Input
            id="city"
            label="City"
            value={data.city || ""}
            onChange={(e) => update("city", e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="state"
              label="State"
              value={data.state || "PA"}
              onChange={(e) => update("state", e.target.value)}
            />
            <Input
              id="zipCode"
              label="Zip Code"
              value={data.zipCode || ""}
              onChange={(e) => update("zipCode", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-navy-900 mb-4">
          EMS Information
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            id="emsCertificationNumber"
            label="PA EMS Certification #"
            value={data.emsCertificationNumber || ""}
            onChange={(e) => update("emsCertificationNumber", e.target.value)}
          />
          <Input
            id="agencyAffiliation"
            label="Agency Affiliation"
            value={data.agencyAffiliation || ""}
            onChange={(e) => update("agencyAffiliation", e.target.value)}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-navy-900 mb-4">
          Emergency Contact
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            id="emergencyContactName"
            label="Emergency Contact Name"
            value={data.emergencyContactName || ""}
            onChange={(e) => update("emergencyContactName", e.target.value)}
          />
          <Input
            id="emergencyContactPhone"
            label="Emergency Contact Phone"
            type="tel"
            value={data.emergencyContactPhone || ""}
            onChange={(e) => update("emergencyContactPhone", e.target.value)}
          />
        </div>
      </div>

      <div>
        <Textarea
          id="specialNeeds"
          label="Special Needs or Accommodations"
          value={data.specialNeeds || ""}
          onChange={(e) => update("specialNeeds", e.target.value)}
          placeholder="Let us know if you have any special requirements..."
        />
      </div>

      <Button onClick={onSubmit} size="lg" className="w-full">
        Continue to Payment
      </Button>
    </div>
  );
}
