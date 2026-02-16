import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ClassForm } from "@/components/admin/ClassForm";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ classId: string }>;
}

export default async function EditClassPage({ params }: Props) {
  const { classId } = await params;
  const supabase = await createClient();

  const { data: cls } = await supabase
    .from("classes")
    .select("*")
    .eq("id", classId)
    .single();

  if (!cls) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900 mb-8">
        Edit: {cls.title}
      </h1>
      <ClassForm mode="edit" initialData={cls} />
    </div>
  );
}
