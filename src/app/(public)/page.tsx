import { createClient } from "@/lib/supabase/server";
import { HeroSection } from "@/components/home/HeroSection";
import { MissionSection } from "@/components/home/MissionSection";
import { UpcomingClassesBanner } from "@/components/home/UpcomingClassesBanner";
import { ContactInfoSection } from "@/components/home/ContactInfoSection";
import type { ClassWithCount } from "@/types/database";

export const revalidate = 300;

export default async function HomePage() {
  const supabase = await createClient();

  const { data: classes } = await supabase
    .from("classes")
    .select("*, registrations(count)")
    .eq("is_published", true)
    .gte("date_start", new Date().toISOString())
    .order("date_start", { ascending: true })
    .limit(3);

  const classesWithCount: ClassWithCount[] = (classes || []).map((cls: any) => ({
    ...cls,
    registration_count: cls.registrations?.[0]?.count ?? 0,
  }));

  return (
    <>
      <HeroSection />
      <MissionSection />
      <UpcomingClassesBanner classes={classesWithCount} />
      <ContactInfoSection />
    </>
  );
}
