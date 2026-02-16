import { createClient } from "@/lib/supabase/server";
import { formatDateShort } from "@/lib/utils/format";
import { ContactRow } from "./ContactRow";

export const dynamic = "force-dynamic";

export default async function AdminContactsPage() {
  const supabase = await createClient();

  const { data: contacts } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900 mb-8">
        Contact Submissions
      </h1>

      {!contacts?.length ? (
        <div className="rounded-xl border border-dashed border-gray-300 py-16 text-center">
          <p className="text-gray-500">No contact submissions yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact: any) => (
            <ContactRow key={contact.id} contact={contact} />
          ))}
        </div>
      )}
    </div>
  );
}
