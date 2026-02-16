import { ClassForm } from "@/components/admin/ClassForm";

export default function NewClassPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900 mb-8">Add New Class</h1>
      <ClassForm mode="create" />
    </div>
  );
}
