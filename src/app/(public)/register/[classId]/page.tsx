import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { RegistrationPageClient } from "./RegistrationPageClient";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ classId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { classId } = await params;
  const supabase = await createClient();
  const { data: cls } = await supabase
    .from("classes")
    .select("title")
    .eq("id", classId)
    .eq("is_published", true)
    .single();

  return {
    title: cls ? `Register - ${cls.title}` : "Register",
  };
}

export default async function RegisterPage({ params }: Props) {
  const { classId } = await params;
  const supabase = await createClient();

  const { data: cls } = await supabase
    .from("classes")
    .select("*")
    .eq("id", classId)
    .eq("is_published", true)
    .single();

  if (!cls || cls.is_full) notFound();

  return <RegistrationPageClient classData={cls} />;
}
