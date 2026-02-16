import { createClient } from "@/lib/supabase/server";
import { ClassCard } from "@/components/classes/ClassCard";
import type { ClassWithCount } from "@/types/database";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Classes",
  description:
    "Browse upcoming EMS training classes including EMT-B, CPR/AED, ACLS, PALS, and continuing education courses.",
};

export default async function ClassesPage() {
  const supabase = await createClient();

  const { data: classes } = await supabase
    .from("classes")
    .select("*, registrations(count)")
    .eq("is_published", true)
    .gte("date_start", new Date().toISOString())
    .order("date_start", { ascending: true });

  const classesWithCount: ClassWithCount[] = (classes || []).map((cls: any) => ({
    ...cls,
    registration_count: cls.registrations?.[0]?.count ?? 0,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-navy-900">Upcoming Classes</h1>
        <p className="mt-2 text-gray-600">
          Browse our current course offerings and register online.
        </p>
      </div>

      {classesWithCount.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 py-16 text-center">
          <p className="text-lg text-gray-500">
            No upcoming classes at this time.
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Check back soon or contact us for more information.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {classesWithCount.map((cls) => (
            <ClassCard key={cls.id} classData={cls} />
          ))}
        </div>
      )}
    </div>
  );
}
