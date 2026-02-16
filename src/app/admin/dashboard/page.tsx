import { createClient } from "@/lib/supabase/server";
import { Card, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatDateShort, formatRelative } from "@/lib/utils/format";
import {
  GraduationCap,
  Users,
  DollarSign,
  Mail,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const now = new Date().toISOString();
  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  ).toISOString();

  // Parallel queries
  const [
    { count: activeClasses },
    { count: monthRegistrations },
    { count: unreadContacts },
    { data: upcomingClasses },
    { data: recentRegistrations },
  ] = await Promise.all([
    supabase
      .from("classes")
      .select("*", { count: "exact", head: true })
      .eq("is_published", true)
      .gte("date_start", now),
    supabase
      .from("registrations")
      .select("*", { count: "exact", head: true })
      .eq("payment_status", "completed")
      .gte("created_at", startOfMonth),
    supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false),
    supabase
      .from("classes")
      .select("*, registrations(count)")
      .gte("date_start", now)
      .order("date_start", { ascending: true })
      .limit(5),
    supabase
      .from("registrations")
      .select("*, classes(title, slug)")
      .eq("payment_status", "completed")
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  const stats = [
    {
      label: "Active Classes",
      value: activeClasses || 0,
      icon: GraduationCap,
      color: "text-navy-700 bg-navy-100",
    },
    {
      label: "Registrations (Month)",
      value: monthRegistrations || 0,
      icon: Users,
      color: "text-gold-700 bg-gold-100",
    },
    {
      label: "Unread Messages",
      value: unreadContacts || 0,
      icon: Mail,
      color: "text-accent-700 bg-accent-50",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900 mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-10">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color}`}
              >
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Upcoming Classes */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Upcoming Classes</CardTitle>
            <Link
              href="/admin/classes"
              className="text-sm text-navy-600 hover:text-navy-800"
            >
              View All
            </Link>
          </div>
          {!upcomingClasses?.length ? (
            <p className="text-sm text-gray-500">No upcoming classes.</p>
          ) : (
            <div className="space-y-3">
              {upcomingClasses.map((cls: any) => {
                const regCount = cls.registrations?.[0]?.count ?? 0;
                return (
                  <div
                    key={cls.id}
                    className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
                  >
                    <div>
                      <Link
                        href={`/admin/classes/${cls.id}/edit`}
                        className="font-medium text-navy-900 hover:text-navy-700 text-sm"
                      >
                        {cls.title}
                      </Link>
                      <p className="text-xs text-gray-500">
                        {formatDateShort(cls.date_start)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {regCount}/{cls.capacity}
                      </p>
                      <p className="text-xs text-gray-500">registered</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* Recent Registrations */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Recent Registrations</CardTitle>
            <Link
              href="/admin/registrations"
              className="text-sm text-navy-600 hover:text-navy-800"
            >
              View All
            </Link>
          </div>
          {!recentRegistrations?.length ? (
            <p className="text-sm text-gray-500">No recent registrations.</p>
          ) : (
            <div className="space-y-3">
              {recentRegistrations.map((reg: any) => (
                <div
                  key={reg.id}
                  className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {reg.first_name} {reg.last_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {reg.classes?.title}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="green">
                      {formatCurrency(reg.payment_amount_cents)}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatRelative(reg.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
