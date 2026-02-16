import { Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { SITE } from "@/constants/site";
import { ContactFormClient } from "./ContactFormClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Williamstown Area EMS Training Center. Questions about classes, registration, or general inquiries.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-navy-900">Contact Us</h1>
        <p className="mt-2 text-gray-600">
          Have questions? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Contact form */}
        <ContactFormClient />

        {/* Contact info */}
        <div>
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-navy-900 mb-6">
              Contact Information
            </h2>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-100">
                  <Mail className="h-5 w-5 text-navy-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-sm text-navy-600 hover:text-navy-800"
                  >
                    {SITE.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-100">
                  <MapPin className="h-5 w-5 text-navy-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Location</p>
                  <p className="text-sm text-gray-600">{SITE.address}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Follow Us
              </h3>
              <div className="flex gap-3">
                <a
                  href={SITE.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-navy-50 px-4 py-2 text-sm text-navy-700 transition-colors hover:bg-navy-100"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </a>
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-navy-50 px-4 py-2 text-sm text-navy-700 transition-colors hover:bg-navy-100"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
