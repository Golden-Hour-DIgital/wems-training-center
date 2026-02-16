import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDateShort, formatCurrency } from "@/lib/utils/format";
import { AttendanceToggle } from "./AttendanceToggle";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ classId: string }>;
}

export default async function ClassRegistrationsPage({ params }: Props) {
  const { classId } = await params;
  const supabase = await createClient();

  const { data: cls } = await supabase
    .from("classes")
    .select("*")
    .eq("id", classId)
    .single();

  if (!cls) notFound();

  const { data: registrations } = await supabase
    .from("registrations")
    .select("*")
    .eq("class_id", classId)
    .eq("payment_status", "completed")
    .order("last_name", { ascending: true });

  return (
    <div>
      <Link
        href="/admin/registrations"
        className="inline-flex items-center gap-1 text-sm text-navy-600 hover:text-navy-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        All Registrations
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">{cls.title}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {formatDateShort(cls.date_start)} &middot;{" "}
            {registrations?.length || 0}/{cls.capacity} registered
          </p>
        </div>
        <a href={`/api/admin/export-csv?classId=${classId}`}>
          <Button variant="outline">Export CSV</Button>
        </a>
      </div>

      {!registrations?.length ? (
        <div className="rounded-xl border border-dashed border-gray-300 py-16 text-center">
          <p className="text-gray-500">
            No completed registrations for this class.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  #
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Email
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Phone
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Agency
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  EMS Cert #
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Paid
                </th>
                <th className="px-4 py-3 text-center font-medium text-gray-600">
                  Attended
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {registrations.map((reg: any, idx: number) => (
                <tr key={reg.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-400">{idx + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {reg.last_name}, {reg.first_name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{reg.email}</td>
                  <td className="px-4 py-3 text-gray-600">{reg.phone}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {reg.agency_affiliation || "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {reg.ems_certification_number || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="green">
                      {formatCurrency(reg.payment_amount_cents)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <AttendanceToggle
                      registrationId={reg.id}
                      attended={reg.attended}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
