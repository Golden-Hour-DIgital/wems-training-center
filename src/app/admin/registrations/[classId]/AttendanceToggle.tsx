"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { markAttendance } from "@/actions/registrations";

interface Props {
  registrationId: string;
  attended: boolean;
}

export function AttendanceToggle({ registrationId, attended }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    await markAttendance(registrationId, !attended);
    router.refresh();
    setLoading(false);
  };

  return (
    <input
      type="checkbox"
      checked={attended}
      onChange={handleToggle}
      disabled={loading}
      className="h-4 w-4 rounded border-gray-300 text-navy-700 focus:ring-navy-500 disabled:opacity-50"
    />
  );
}
