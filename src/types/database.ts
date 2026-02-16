export type ClassType =
  | "emt-b"
  | "ce-course"
  | "cpr-aed"
  | "acls"
  | "pals"
  | "other";

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export type AdminRole = "super_admin" | "admin" | "instructor";

export interface Class {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string | null;
  class_type: ClassType;
  date_start: string;
  date_end: string | null;
  time_details: string | null;
  location: string;
  location_address: string | null;
  price_cents: number;
  ce_hours: number | null;
  capacity: number;
  instructor: string | null;
  prerequisites: string | null;
  materials_included: string | null;
  is_published: boolean;
  is_full: boolean;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface ClassWithCount extends Class {
  registration_count: number;
}

export interface Registration {
  id: string;
  class_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  ems_certification_number: string | null;
  agency_affiliation: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  special_needs: string | null;
  payment_status: PaymentStatus;
  payment_amount_cents: number;
  square_payment_id: string | null;
  square_receipt_url: string | null;
  attended: boolean;
  attendance_marked_at: string | null;
  attendance_marked_by: string | null;
  notes: string | null;
  created_at: string;
}

export interface RegistrationWithClass extends Registration {
  classes: Pick<Class, "title" | "slug" | "date_start">;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  read_by: string | null;
  read_at: string | null;
  created_at: string;
}

export interface AdminProfile {
  id: string;
  full_name: string;
  role: AdminRole;
  is_active: boolean;
  created_at: string;
}
