import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatDateShort, formatCurrency } from "@/lib/utils/format";

export const dynamic = "force-dynamic";

export default async function AdminRegistrationsPage() {
  const supabase = await createClient();

  const { data: registrations } = await supabase
    .from("registrations")
    .select("*, classes(title, slug, date_start)")
    .order("created_at", { ascending: false });

  const paymentStatusVariant: Record<string, "green" | "red" | "gray" | "gold"> = {
    completed: "green",
    failed: "red",
    pending: "gold",
    refunded: "gray",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900 mb-8">
        All Registrations
      </h1>

      {!registrations?.length ? (
        <div className="rounded-xl border border-dashed border-gray-300 py-16 text-center">
          <p className="text-gray-500">No registrations yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Student
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Email
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Class
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Date
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Amount
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Attended
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {registrations.map((reg: any) => (
                <tr key={reg.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {reg.first_name} {reg.last_name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{reg.email}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/registrations/${reg.class_id}`}
                      className="text-navy-600 hover:text-navy-800"
                    >
                      {reg.classes?.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {formatDateShort(reg.created_at)}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {formatCurrency(reg.payment_amount_cents)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        paymentStatusVariant[reg.payment_status] || "gray"
                      }
                    >
                      {reg.payment_status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    {reg.attended ? (
                      <Badge variant="green">Yes</Badge>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
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
