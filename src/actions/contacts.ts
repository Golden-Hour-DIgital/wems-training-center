"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function markContactRead(contactId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("contact_submissions")
    .update({
      is_read: true,
      read_by: user.id,
      read_at: new Date().toISOString(),
    })
    .eq("id", contactId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/contacts");
}
