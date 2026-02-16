import { NextRequest, NextResponse } from "next/server";
import { squareClient } from "@/lib/square/client";
import { createAdminClient } from "@/lib/supabase/admin";
import { paymentSchema } from "@/lib/utils/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = paymentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    const { sourceId, classId, studentInfo } = parsed.data;
    const supabase = createAdminClient();

    // Fetch class and verify availability
    const { data: classData, error: classError } = await supabase
      .from("classes")
      .select("*")
      .eq("id", classId)
      .eq("is_published", true)
      .single();

    if (classError || !classData) {
      return NextResponse.json(
        { error: "Class not found or unavailable" },
        { status: 400 }
      );
    }

    if (classData.is_full) {
      return NextResponse.json(
        { error: "This class is at full capacity" },
        { status: 400 }
      );
    }

    // Check for duplicate registration
    const { data: existing } = await supabase
      .from("registrations")
      .select("id")
      .eq("class_id", classId)
      .eq("email", studentInfo.email)
      .eq("payment_status", "completed")
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "You are already registered for this class" },
        { status: 400 }
      );
    }

    // Process Square payment
    const paymentResponse = await squareClient.payments.create({
      sourceId,
      idempotencyKey: crypto.randomUUID(),
      amountMoney: {
        amount: BigInt(classData.price_cents),
        currency: "USD",
      },
      note: `WEMS Registration: ${classData.title} - ${studentInfo.firstName} ${studentInfo.lastName}`,
      referenceId: classId,
    });

    const payment = paymentResponse.payment;

    // Insert registration record
    const { data: registration, error: regError } = await supabase
      .from("registrations")
      .insert({
        class_id: classId,
        first_name: studentInfo.firstName,
        last_name: studentInfo.lastName,
        email: studentInfo.email,
        phone: studentInfo.phone,
        date_of_birth: studentInfo.dateOfBirth || null,
        address_line1: studentInfo.addressLine1 || null,
        address_line2: studentInfo.addressLine2 || null,
        city: studentInfo.city || null,
        state: studentInfo.state || "PA",
        zip_code: studentInfo.zipCode || null,
        ems_certification_number: studentInfo.emsCertificationNumber || null,
        agency_affiliation: studentInfo.agencyAffiliation || null,
        emergency_contact_name: studentInfo.emergencyContactName || null,
        emergency_contact_phone: studentInfo.emergencyContactPhone || null,
        special_needs: studentInfo.specialNeeds || null,
        payment_status: "completed",
        payment_amount_cents: classData.price_cents,
        square_payment_id: payment?.id || null,
        square_receipt_url: payment?.receiptUrl || null,
      })
      .select()
      .single();

    if (regError) {
      console.error("Registration insert error:", regError);
      return NextResponse.json(
        { error: "Failed to save registration. Payment was processed — please contact us." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      registrationId: registration.id,
      receiptUrl: payment?.receiptUrl || null,
    });
  } catch (error: any) {
    console.error("Payment error:", error);

    // Try to save failed registration for tracking
    try {
      const body = await request.clone().json();
      const parsed = paymentSchema.safeParse(body);
      if (parsed.success) {
        const supabase = createAdminClient();
        const { data: classData } = await supabase
          .from("classes")
          .select("price_cents")
          .eq("id", parsed.data.classId)
          .single();

        await supabase.from("registrations").insert({
          class_id: parsed.data.classId,
          first_name: parsed.data.studentInfo.firstName,
          last_name: parsed.data.studentInfo.lastName,
          email: parsed.data.studentInfo.email,
          phone: parsed.data.studentInfo.phone,
          payment_status: "failed",
          payment_amount_cents: classData?.price_cents || 0,
        });
      }
    } catch {
      // Silently fail — the main error is already being returned
    }

    return NextResponse.json(
      { error: "Payment failed. Please try again." },
      { status: 402 }
    );
  }
}
