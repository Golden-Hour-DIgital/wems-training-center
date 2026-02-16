"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteClass, toggleClassPublished } from "@/actions/classes";
import { Button } from "@/components/ui/Button";
import { Pencil, Trash2, Eye, EyeOff, Users } from "lucide-react";

interface Props {
  classId: string;
  isPublished: boolean;
  hasRegistrations: boolean;
}

export function AdminClassActions({
  classId,
  isPublished,
  hasRegistrations,
}: Props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this class?")) return;
    setDeleting(true);
    const result = await deleteClass(classId);
    if (result?.error) {
      alert(result.error);
    }
    setDeleting(false);
    router.refresh();
  };

  const handleTogglePublished = async () => {
    await toggleClassPublished(classId, !isPublished);
    router.refresh();
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <Link href={`/admin/registrations/${classId}`}>
        <Button variant="ghost" size="sm" title="View Registrations">
          <Users className="h-4 w-4" />
        </Button>
      </Link>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleTogglePublished}
        title={isPublished ? "Unpublish" : "Publish"}
      >
        {isPublished ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </Button>
      <Link href={`/admin/classes/${classId}/edit`}>
        <Button variant="ghost" size="sm" title="Edit">
          <Pencil className="h-4 w-4" />
        </Button>
      </Link>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        disabled={deleting || hasRegistrations}
        title={
          hasRegistrations
            ? "Cannot delete — has registrations"
            : "Delete"
        }
        className="text-accent-500 hover:text-accent-700 hover:bg-accent-50"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
