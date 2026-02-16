"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { publicNav } from "@/constants/navigation";
import { cn } from "@/lib/utils/cn";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy-800 bg-navy-900 shadow-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between pl-2 pr-4 py-4 sm:pl-3 sm:pr-6 lg:pl-4 lg:pr-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/images/logo.webp"
            alt="WEMS Training Center"
            width={112}
            height={112}
            className="h-24 w-24 object-contain"
            priority
          />
          <div className="hidden sm:block">
            <p className="text-xl font-bold text-white leading-tight">
              WEMS Training Center
            </p>
            <p className="text-sm text-navy-300">
              Certified EMS Training Institute
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {publicNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-navy-700 text-gold-400"
                  : "text-navy-200 hover:bg-navy-800 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/classes"
            className="ml-3 rounded-lg bg-gold-400 px-5 py-2 text-sm font-bold text-navy-900 transition-colors hover:bg-gold-500"
          >
            Register Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden rounded-lg p-2 text-navy-200 hover:bg-navy-800 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-navy-800 bg-navy-900 md:hidden">
          <div className="space-y-1 px-4 py-3">
            {publicNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-navy-700 text-gold-400"
                    : "text-navy-200 hover:bg-navy-800 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/classes"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg bg-gold-400 px-4 py-2.5 text-center text-sm font-bold text-navy-900 transition-colors hover:bg-gold-500"
            >
              Register Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
