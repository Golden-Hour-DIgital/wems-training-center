-- WEMS Training Center Database Schema
-- Run this in the Supabase SQL Editor

-- Classes table
CREATE TABLE public.classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL,
  short_description text,
  class_type text NOT NULL CHECK (class_type IN ('emt-b', 'ce-course', 'cpr-aed', 'acls', 'pals', 'other')),
  date_start timestamptz NOT NULL,
  date_end timestamptz,
  time_details text,
  location text NOT NULL DEFAULT 'Williamstown Area EMS Training Center',
  location_address text,
  price_cents integer NOT NULL,
  ce_hours numeric(4,1),
  capacity integer NOT NULL,
  instructor text,
  prerequisites text,
  materials_included text,
  is_published boolean NOT NULL DEFAULT false,
  is_full boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Registrations table
CREATE TABLE public.registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id uuid NOT NULL REFERENCES public.classes(id) ON DELETE RESTRICT,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  date_of_birth date,
  address_line1 text,
  address_line2 text,
  city text,
  state text DEFAULT 'PA',
  zip_code text,
  ems_certification_number text,
  agency_affiliation text,
  emergency_contact_name text,
  emergency_contact_phone text,
  special_needs text,
  payment_status text NOT NULL DEFAULT 'pending'
    CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_amount_cents integer NOT NULL,
  square_payment_id text,
  square_receipt_url text,
  attended boolean NOT NULL DEFAULT false,
  attendance_marked_at timestamptz,
  attendance_marked_by uuid REFERENCES auth.users(id),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(class_id, email)
);

-- Contact submissions table
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  read_by uuid REFERENCES auth.users(id),
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Admin profiles table
CREATE TABLE public.admin_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'admin'
    CHECK (role IN ('super_admin', 'admin', 'instructor')),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_classes_updated_at
  BEFORE UPDATE ON public.classes
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Capacity check trigger
CREATE OR REPLACE FUNCTION public.check_class_capacity()
RETURNS TRIGGER AS $$
DECLARE
  current_count integer;
  max_capacity integer;
BEGIN
  SELECT capacity INTO max_capacity FROM public.classes WHERE id = NEW.class_id;
  SELECT COUNT(*) INTO current_count
    FROM public.registrations
    WHERE class_id = NEW.class_id AND payment_status = 'completed';

  IF current_count >= max_capacity THEN
    RAISE EXCEPTION 'Class is at full capacity';
  END IF;

  IF current_count + 1 >= max_capacity THEN
    UPDATE public.classes SET is_full = true WHERE id = NEW.class_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_capacity_before_registration
  BEFORE INSERT ON public.registrations
  FOR EACH ROW
  WHEN (NEW.payment_status = 'completed')
  EXECUTE FUNCTION public.check_class_capacity();

-- Enable RLS
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies: classes
CREATE POLICY "Public can view published classes"
  ON public.classes FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can do everything with classes"
  ON public.classes FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.admin_profiles WHERE is_active = true));

-- RLS Policies: registrations
CREATE POLICY "Public can insert registrations"
  ON public.registrations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all registrations"
  ON public.registrations FOR SELECT
  USING (auth.uid() IN (SELECT id FROM public.admin_profiles WHERE is_active = true));

CREATE POLICY "Admins can update registrations"
  ON public.registrations FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM public.admin_profiles WHERE is_active = true));

-- RLS Policies: contact_submissions
CREATE POLICY "Public can insert contacts"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view contacts"
  ON public.contact_submissions FOR SELECT
  USING (auth.uid() IN (SELECT id FROM public.admin_profiles WHERE is_active = true));

CREATE POLICY "Admins can update contacts"
  ON public.contact_submissions FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM public.admin_profiles WHERE is_active = true));

-- RLS Policies: admin_profiles
CREATE POLICY "Admins can view own profile"
  ON public.admin_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Super admins can manage all profiles"
  ON public.admin_profiles FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.admin_profiles WHERE role = 'super_admin' AND is_active = true));

-- Indexes
CREATE INDEX idx_classes_slug ON public.classes(slug);
CREATE INDEX idx_classes_date_start ON public.classes(date_start);
CREATE INDEX idx_classes_published ON public.classes(is_published) WHERE is_published = true;
CREATE INDEX idx_registrations_class_id ON public.registrations(class_id);
CREATE INDEX idx_registrations_email ON public.registrations(email);
CREATE INDEX idx_registrations_payment_status ON public.registrations(payment_status);
CREATE INDEX idx_contacts_is_read ON public.contact_submissions(is_read);
CREATE INDEX idx_contacts_created_at ON public.contact_submissions(created_at DESC);
