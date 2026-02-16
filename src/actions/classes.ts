"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generateSlug } from "@/lib/utils/slug";

export async function createClass(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || generateSlug(title);

  const { error } = await supabase.from("classes").insert({
    title,
    slug,
    description: formData.get("description") as string,
    short_description: (formData.get("shortDescription") as string) || null,
    class_type: formData.get("classType") as string,
    date_start: formData.get("dateStart") as string,
    date_end: (formData.get("dateEnd") as string) || null,
    time_details: (formData.get("timeDetails") as string) || null,
    location:
      (formData.get("location") as string) ||
      "Williamstown Area EMS Training Center",
    location_address: (formData.get("locationAddress") as string) || null,
    price_cents: Math.round(parseFloat(formData.get("priceDollars") as string) * 100),
    ce_hours: formData.get("ceHours")
      ? parseFloat(formData.get("ceHours") as string)
      : null,
    capacity: parseInt(formData.get("capacity") as string),
    instructor: (formData.get("instructor") as string) || null,
    prerequisites: (formData.get("prerequisites") as string) || null,
    materials_included: (formData.get("materialsIncluded") as string) || null,
    is_published: formData.get("isPublished") === "on",
    created_by: user.id,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/classes");
  revalidatePath("/classes");
  revalidatePath("/");
  redirect("/admin/classes");
}

export async function updateClass(classId: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || generateSlug(title);

  const { error } = await supabase
    .from("classes")
    .update({
      title,
      slug,
      description: formData.get("description") as string,
      short_description: (formData.get("shortDescription") as string) || null,
      class_type: formData.get("classType") as string,
      date_start: formData.get("dateStart") as string,
      date_end: (formData.get("dateEnd") as string) || null,
      time_details: (formData.get("timeDetails") as string) || null,
      location:
        (formData.get("location") as string) ||
        "Williamstown Area EMS Training Center",
      location_address: (formData.get("locationAddress") as string) || null,
      price_cents: Math.round(
        parseFloat(formData.get("priceDollars") as string) * 100
      ),
      ce_hours: formData.get("ceHours")
        ? parseFloat(formData.get("ceHours") as string)
        : null,
      capacity: parseInt(formData.get("capacity") as string),
      instructor: (formData.get("instructor") as string) || null,
      prerequisites: (formData.get("prerequisites") as string) || null,
      materials_included: (formData.get("materialsIncluded") as string) || null,
      is_published: formData.get("isPublished") === "on",
    })
    .eq("id", classId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/classes");
  revalidatePath("/classes");
  revalidatePath("/");
  redirect("/admin/classes");
}

export async function deleteClass(classId: string) {
  const supabase = await createClient();

  // Check for existing registrations
  const { count } = await supabase
    .from("registrations")
    .select("*", { count: "exact", head: true })
    .eq("class_id", classId)
    .eq("payment_status", "completed");

  if (count && count > 0) {
    return { error: "Cannot delete a class with existing registrations." };
  }

  const { error } = await supabase.from("classes").delete().eq("id", classId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/classes");
  revalidatePath("/classes");
  revalidatePath("/");
}

export async function toggleClassPublished(
  classId: string,
  isPublished: boolean
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("classes")
    .update({ is_published: isPublished })
    .eq("id", classId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/classes");
  revalidatePath("/classes");
  revalidatePath("/");
}
