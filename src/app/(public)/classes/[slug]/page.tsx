import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import type { Metadata } from "next";

export const revalidate = 60;

const classTypeLabels: Record<string, string> = {
  "emt-b": "EMT-B",
  "ce-course": "CE Course",
  "cpr-aed": "CPR/AED",
  acls: "ACLS",
  pals: "PALS",
  other: "Other",
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: cls } = await supabase
    .from("classes")
    .select("title, short_description")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!cls) return { title: "Class Not Found" };

  return {
    title: cls.title,
    description:
      cls.short_description ||
      `Register for ${cls.title} at WEMS Training Center.`,
  };
}

export default async function ClassDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: cls } = await supabase
    .from("classes")
    .select("*, registrations(count)")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!cls) notFound();

  const registrationCount = (cls as any).registrations?.[0]?.count ?? 0;
  const spotsRemaining = cls.capacity - registrationCount;
  const isFull = cls.is_full || spotsRemaining <= 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <Link
        href="/classes"
        className="inline-flex items-center gap-1 text-sm text-navy-600 hover:text-navy-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Classes
      </Link>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="navy">
              {classTypeLabels[cls.class_type] || cls.class_type}
            </Badge>
            {cls.ce_hours && (
              <Badge variant="gold">{cls.ce_hours} CE Hours</Badge>
            )}
            {isFull && <Badge variant="red">Class Full</Badge>}
          </div>

          <h1 className="text-3xl font-bold text-navy-900 sm:text-4xl">
            {cls.title}
          </h1>

          <div className="mt-8">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {cls.description}
            </div>
          </div>

          {cls.prerequisites && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-3">
                Prerequisites
              </h2>
              <p className="text-gray-700">{cls.prerequisites}</p>
            </div>
          )}

          {cls.materials_included && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-3">
                Materials Included
              </h2>
              <p className="text-gray-700">{cls.materials_included}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-3xl font-bold text-navy-900">
              {formatCurrency(cls.price_cents)}
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-5 w-5 text-navy-500" />
                <div>
                  <p className="font-medium text-gray-900">
                    {formatDate(cls.date_start)}
                  </p>
                  {cls.date_end && (
                    <p className="text-gray-500">
                      through {formatDate(cls.date_end)}
                    </p>
                  )}
                </div>
              </div>

              {cls.time_details && (
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-5 w-5 text-navy-500" />
                  <span className="text-gray-700">{cls.time_details}</span>
                </div>
              )}

              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-5 w-5 text-navy-500" />
                <span className="text-gray-700">{cls.location}</span>
              </div>

              {cls.instructor && (
                <div className="flex items-center gap-3 text-sm">
                  <Award className="h-5 w-5 text-navy-500" />
                  <span className="text-gray-700">
                    Instructor: {cls.instructor}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 text-sm">
                <Users className="h-5 w-5 text-navy-500" />
                {isFull ? (
                  <span className="font-medium text-accent-500">
                    Class is full
                  </span>
                ) : (
                  <span className="text-gray-700">
                    {spotsRemaining} of {cls.capacity} spots remaining
                  </span>
                )}
              </div>

              {cls.ce_hours && (
                <div className="flex items-center gap-3 text-sm">
                  <BookOpen className="h-5 w-5 text-navy-500" />
                  <span className="text-gray-700">
                    {cls.ce_hours} CE Hours
                  </span>
                </div>
              )}
            </div>

            <div className="mt-6">
              {isFull ? (
                <Button disabled className="w-full">
                  Class Full
                </Button>
              ) : (
                <Link href={`/register/${cls.id}`} className="block">
                  <Button size="lg" className="w-full">
                    Register Now
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
