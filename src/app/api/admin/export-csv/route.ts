import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateCSV } from "@/lib/utils/csv";

export async function GET(request: NextRequest) {
  const classId = request.nextUrl.searchParams.get("classId");

  if (!classId) {
    return NextResponse.json({ error: "classId required" }, { status: 400 });
  }

  const supabase = await createClient();

  // Verify admin
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("is_active")
    .eq("id", user.id)
    .single();

  if (!profile?.is_active) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch class and registrations
  const { data: cls } = await supabase
    .from("classes")
    .select("title")
    .eq("id", classId)
    .single();

  const { data: registrations } = await supabase
    .from("registrations")
    .select("*")
    .eq("class_id", classId)
    .eq("payment_status", "completed")
    .order("last_name", { ascending: true });

  if (!registrations) {
    return NextResponse.json({ error: "No data" }, { status: 404 });
  }

  const headers = [
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Date of Birth",
    "Agency",
    "EMS Cert #",
    "Address",
    "City",
    "State",
    "Zip",
    "Emergency Contact",
    "Emergency Phone",
    "Payment Status",
    "Amount Paid",
    "Attended",
    "Date Registered",
  ];

  const rows = registrations.map((reg) => [
    reg.first_name,
    reg.last_name,
    reg.email,
    reg.phone,
    reg.date_of_birth || "",
    reg.agency_affiliation || "",
    reg.ems_certification_number || "",
    reg.address_line1 || "",
    reg.city || "",
    reg.state || "",
    reg.zip_code || "",
    reg.emergency_contact_name || "",
    reg.emergency_contact_phone || "",
    reg.payment_status,
    `$${(reg.payment_amount_cents / 100).toFixed(2)}`,
    reg.attended ? "Yes" : "No",
    new Date(reg.created_at).toLocaleDateString(),
  ]);

  const csv = generateCSV(headers, rows);
  const filename = `${(cls?.title || "class").replace(/[^a-zA-Z0-9]/g, "-")}-attendees.csv`;

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
