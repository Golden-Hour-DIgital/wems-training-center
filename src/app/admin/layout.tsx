import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // Get unread contact count for sidebar badge
  const { count: unreadContacts } = await supabase
    .from("contact_submissions")
    .select("*", { count: "exact", head: true })
    .eq("is_read", false);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar unreadContacts={unreadContacts || 0} />
      <div className="lg:pl-64">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </div>
  );
}
