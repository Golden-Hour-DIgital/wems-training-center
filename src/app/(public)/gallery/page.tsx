import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from Williamstown Area EMS Training Center — hands-on training, classroom instruction, and our community.",
};

const galleryImages = [
  {
    src: "/images/gallery/training-01.jpg",
    alt: "EMS training session at WEMS Training Center",
    width: 3500,
    height: 2625,
    span: "col-span-2 row-span-2",
  },
  {
    src: "/images/gallery/training-03.jpg",
    alt: "WEMS Training Center community event",
    width: 2048,
    height: 1536,
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/gallery/training-06.jpg",
    alt: "Students during EMS training",
    width: 2048,
    height: 1536,
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/gallery/training-02.jpg",
    alt: "Hands-on skills training at WEMS",
    width: 3500,
    height: 2625,
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/gallery/training-04.jpg",
    alt: "Emergency medical services training equipment",
    width: 3500,
    height: 2625,
    span: "col-span-2 row-span-1",
  },
  {
    src: "/images/gallery/training-07.jpg",
    alt: "WEMS Training Center group photo",
    width: 2048,
    height: 1536,
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/gallery/training-05.jpg",
    alt: "EMS certification course in progress",
    width: 1536,
    height: 2048,
    span: "col-span-1 row-span-2",
  },
  {
    src: "/images/gallery/training-08.jpg",
    alt: "Advanced EMS training at WEMS Training Center",
    width: 3500,
    height: 2625,
    span: "col-span-2 row-span-1",
  },
];

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-navy-900 sm:text-4xl">
          We Believe in Comprehensive Training
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-gray-600">
          Take a look at our training center, instructors, and students in
          action. We&apos;re proud to provide hands-on, real-world EMS education.
        </p>
      </div>

      {/* Masonry-style grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:gap-5">
        {galleryImages.map((img, idx) => (
          <div
            key={idx}
            className={`group relative overflow-hidden rounded-xl ${img.span}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-sm text-white/90">{img.alt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center rounded-xl bg-navy-50 p-10">
        <h2 className="text-2xl font-bold text-navy-900">
          Ready to Start Your EMS Career?
        </h2>
        <p className="mt-2 text-gray-600">
          Join our next class and become part of the WEMS family.
        </p>
        <a
          href="/classes"
          className="mt-6 inline-block rounded-lg bg-navy-700 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy-800"
        >
          Browse Classes
        </a>
      </div>
    </div>
  );
}
