import { z } from "zod/v4";

export const registrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  dateOfBirth: z.string().optional(),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  emsCertificationNumber: z.string().optional(),
  agencyAffiliation: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  specialNeeds: z.string().optional(),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Valid email is required"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const classSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  shortDescription: z.string().optional(),
  classType: z.enum(["emt-b", "ce-course", "cpr-aed", "acls", "pals", "other"]),
  dateStart: z.string().min(1, "Start date is required"),
  dateEnd: z.string().optional(),
  timeDetails: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  locationAddress: z.string().optional(),
  priceDollars: z.coerce.number().min(0, "Price must be 0 or greater"),
  ceHours: z.coerce.number().optional(),
  capacity: z.coerce.number().int().min(1, "Capacity must be at least 1"),
  instructor: z.string().optional(),
  prerequisites: z.string().optional(),
  materialsIncluded: z.string().optional(),
  isPublished: z.boolean().default(false),
});

export type ClassFormData = z.infer<typeof classSchema>;

export const paymentSchema = z.object({
  sourceId: z.string().min(1),
  classId: z.string().uuid(),
  studentInfo: registrationSchema,
});
