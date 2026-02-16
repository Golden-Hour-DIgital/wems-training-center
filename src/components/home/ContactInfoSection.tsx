import Link from "next/link";
import { Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/constants/site";

export function ContactInfoSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-navy-900">Get in Touch</h2>
            <p className="mt-4 text-gray-600">
              Have questions about our courses or need more information? We&apos;d
              love to hear from you.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-100">
                  <Mail className="h-5 w-5 text-navy-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-sm text-navy-600 hover:text-navy-800"
                  >
                    {SITE.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-100">
                  <MapPin className="h-5 w-5 text-navy-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Location</p>
                  <p className="text-sm text-gray-600">{SITE.address}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-navy-100 p-2.5 text-navy-700 transition-colors hover:bg-navy-200"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-navy-100 p-2.5 text-navy-700 transition-colors hover:bg-navy-200"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>

            <div className="mt-8">
              <Link href="/contact">
                <Button>Send Us a Message</Button>
              </Link>
            </div>
          </div>

          <div className="rounded-xl bg-navy-50 p-8 lg:p-12">
            <h3 className="text-xl font-bold text-navy-900">About Our Center</h3>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Under the provisions of the PA Emergency Medical Services Act, our
              training institute offers comprehensive training with high didactic
              and skill educators to provide each student with the best advantage
              for tools needed to be successful pre-hospital providers.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Whether you&apos;re starting your career in EMS or maintaining your
              certifications with continuing education courses, WEMS Training
              Center is here to support your professional development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
