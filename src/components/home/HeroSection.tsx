import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      {/* Background image */}
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-900/75 to-navy-900/60" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-sm font-medium text-gold-400">
              Spring 2026 Registration Open
            </span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Training the Next Generation of{" "}
            <span className="text-gold-400">EMS Professionals</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-200">
            Williamstown Area EMS Training Center is a PA Department of Health
            certified training institute providing comprehensive EMS education
            with experienced instructors in Williamstown, Pennsylvania.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/classes">
              <Button size="lg" variant="secondary">
                Browse Classes
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
