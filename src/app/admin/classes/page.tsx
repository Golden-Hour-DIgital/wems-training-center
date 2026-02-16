import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatDateShort } from "@/lib/utils/format";
import { Plus } from "lucide-react";
import { AdminClassActions } from "./AdminClassActions";

export const dynamic = "force-dynamic";

const classTypeLabels: Record<string, string> = {
  "emt-b": "EMT-B",
  "ce-course": "CE Course",
  "cpr-aed": "CPR/AED",
  acls: "ACLS",
  pals: "PALS",
  other: "Other",
};

export default async function AdminClassesPage() {
  const supabase = await createClient();

  const { data: classes } = await supabase
    .from("classes")
    .select("*, registrations(count)")
    .order("date_start", { ascending: false });

  const classesWithCount = (classes || []).map((cls: any) => ({
    ...cls,
    registration_count: cls.registrations?.[0]?.count ?? 0,
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-navy-900">Manage Classes</h1>
        <Link href="/admin/classes/new">
          <Button>
            <Plus className="h-4 w-4" />
            Add New Class
          </Button>
        </Link>
      </div>

      {classesWithCount.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 py-16 text-center">
          <p className="text-gray-500">No classes yet.</p>
          <Link href="/admin/classes/new" className="mt-4 inline-block">
            <Button variant="outline">Create Your First Class</Button>
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Title
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Type
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Date
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Price
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Capacity
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Status
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {classesWithCount.map((cls: any) => (
                <tr key={cls.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/classes/${cls.id}/edit`}
                      className="font-medium text-navy-900 hover:text-navy-700"
                    >
                      {cls.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="navy">
                      {classTypeLabels[cls.class_type] || cls.class_type}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {formatDateShort(cls.date_start)}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {formatCurrency(cls.price_cents)}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {cls.registration_count}/{cls.capacity}
                  </td>
                  <td className="px-4 py-3">
                    {cls.is_published ? (
                      <Badge variant="green">Published</Badge>
                    ) : (
                      <Badge variant="gray">Draft</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <AdminClassActions
                      classId={cls.id}
                      isPublished={cls.is_published}
                      hasRegistrations={cls.registration_count > 0}
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
