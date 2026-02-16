"use client";

import { useActionState, useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { generateSlug } from "@/lib/utils/slug";
import { createClass, updateClass } from "@/actions/classes";
import type { Class } from "@/types/database";

const classTypeOptions = [
  { value: "emt-b", label: "EMT-B" },
  { value: "ce-course", label: "CE Course" },
  { value: "cpr-aed", label: "CPR/AED" },
  { value: "acls", label: "ACLS" },
  { value: "pals", label: "PALS" },
  { value: "other", label: "Other" },
];

interface Props {
  mode: "create" | "edit";
  initialData?: Class;
}

export function ClassForm({ mode, initialData }: Props) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [autoSlug, setAutoSlug] = useState(!initialData);

  useEffect(() => {
    if (autoSlug && title) {
      setSlug(generateSlug(title));
    }
  }, [title, autoSlug]);

  const action = async (_prevState: any, formData: FormData) => {
    if (mode === "edit" && initialData) {
      return updateClass(initialData.id, formData);
    }
    return createClass(formData);
  };

  const [state, formAction, pending] = useActionState(action, null);

  const formatDateForInput = (date: string | null) => {
    if (!date) return "";
    return new Date(date).toISOString().slice(0, 16);
  };

  return (
    <form action={formAction} className="space-y-6 max-w-3xl">
      {state?.error && (
        <Alert variant="error">{state.error}</Alert>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Input
            id="title"
            name="title"
            label="Class Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="sm:col-span-2">
          <Input
            id="slug"
            name="slug"
            label="URL Slug"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setAutoSlug(false);
            }}
          />
          <p className="mt-1 text-xs text-gray-500">
            /classes/{slug || "..."}
          </p>
        </div>

        <div className="sm:col-span-2">
          <Textarea
            id="description"
            name="description"
            label="Full Description *"
            defaultValue={initialData?.description || ""}
            rows={6}
            required
          />
        </div>

        <div className="sm:col-span-2">
          <Input
            id="shortDescription"
            name="shortDescription"
            label="Short Description (for cards)"
            defaultValue={initialData?.short_description || ""}
          />
        </div>

        <Select
          id="classType"
          name="classType"
          label="Class Type *"
          options={classTypeOptions}
          defaultValue={initialData?.class_type || "emt-b"}
          required
        />

        <Input
          id="priceDollars"
          name="priceDollars"
          label="Price ($) *"
          type="number"
          step="0.01"
          min="0"
          defaultValue={
            initialData ? (initialData.price_cents / 100).toFixed(2) : ""
          }
          required
        />

        <Input
          id="dateStart"
          name="dateStart"
          label="Start Date/Time *"
          type="datetime-local"
          defaultValue={formatDateForInput(initialData?.date_start || null)}
          required
        />

        <Input
          id="dateEnd"
          name="dateEnd"
          label="End Date/Time"
          type="datetime-local"
          defaultValue={formatDateForInput(initialData?.date_end || null)}
        />

        <div className="sm:col-span-2">
          <Input
            id="timeDetails"
            name="timeDetails"
            label="Schedule Details"
            placeholder="e.g., Tuesdays & Thursdays, 6-10 PM"
            defaultValue={initialData?.time_details || ""}
          />
        </div>

        <Input
          id="location"
          name="location"
          label="Location *"
          defaultValue={
            initialData?.location || "Williamstown Area EMS Training Center"
          }
          required
        />

        <Input
          id="locationAddress"
          name="locationAddress"
          label="Full Address"
          defaultValue={initialData?.location_address || ""}
        />

        <Input
          id="ceHours"
          name="ceHours"
          label="CE Hours"
          type="number"
          step="0.5"
          min="0"
          defaultValue={initialData?.ce_hours?.toString() || ""}
        />

        <Input
          id="capacity"
          name="capacity"
          label="Max Capacity *"
          type="number"
          min="1"
          defaultValue={initialData?.capacity?.toString() || ""}
          required
        />

        <Input
          id="instructor"
          name="instructor"
          label="Instructor"
          defaultValue={initialData?.instructor || ""}
        />

        <div className="sm:col-span-2">
          <Textarea
            id="prerequisites"
            name="prerequisites"
            label="Prerequisites"
            defaultValue={initialData?.prerequisites || ""}
            rows={3}
          />
        </div>

        <div className="sm:col-span-2">
          <Textarea
            id="materialsIncluded"
            name="materialsIncluded"
            label="Materials Included"
            defaultValue={initialData?.materials_included || ""}
            rows={3}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isPublished"
              defaultChecked={initialData?.is_published || false}
              className="h-4 w-4 rounded border-gray-300 text-navy-700 focus:ring-navy-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Publish this class (visible to public)
            </span>
          </label>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending
            ? "Saving..."
            : mode === "create"
              ? "Create Class"
              : "Update Class"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => history.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
