"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function markAttendance(
  registrationId: string,
  attended: boolean
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("registrations")
    .update({
      attended,
      attendance_marked_at: attended ? new Date().toISOString() : null,
      attendance_marked_by: attended ? user.id : null,
    })
    .eq("id", registrationId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/registrations");
}
