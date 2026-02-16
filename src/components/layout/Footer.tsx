import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, MapPin, Shield } from "lucide-react";
import { SITE } from "@/constants/site";

export function Footer() {
  return (
    <footer className="border-t border-navy-800 bg-navy-950 text-navy-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.webp"
                alt="WEMS Training Center"
                width={52}
                height={52}
                className="h-13 w-13 object-contain"
              />
              <p className="text-lg font-bold text-white">WEMS Training Center</p>
            </div>
            <p className="text-sm leading-relaxed">
              {SITE.description}
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs text-gold-400">
              <Shield className="h-4 w-4" />
              <span>{SITE.certification}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-gold-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/classes" className="hover:text-gold-400 transition-colors">
                  Classes
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold-400 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-gold-400 transition-colors">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold-400" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="hover:text-gold-400 transition-colors"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold-400" />
                <span>{SITE.location}</span>
              </li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-navy-800 p-2 text-navy-300 transition-colors hover:bg-navy-700 hover:text-gold-400"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-navy-800 p-2 text-navy-300 transition-colors hover:bg-navy-700 hover:text-gold-400"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-navy-800 pt-6 text-center text-xs text-navy-500">
          &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
