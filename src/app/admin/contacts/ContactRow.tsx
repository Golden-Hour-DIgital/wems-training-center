"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Mail } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatDateShort } from "@/lib/utils/format";
import { markContactRead } from "@/actions/contacts";
import { cn } from "@/lib/utils/cn";

interface Props {
  contact: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    is_read: boolean;
    created_at: string;
  };
}

export function ContactRow({ contact }: Props) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  const handleExpand = async () => {
    setExpanded(!expanded);
    if (!expanded && !contact.is_read) {
      await markContactRead(contact.id);
      router.refresh();
    }
  };

  return (
    <div
      className={cn(
        "rounded-xl border bg-white overflow-hidden transition-shadow",
        !contact.is_read && "border-l-4 border-l-gold-400",
        expanded && "shadow-md"
      )}
    >
      <button
        onClick={handleExpand}
        className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-gray-50"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
              contact.is_read ? "bg-gray-100" : "bg-gold-100"
            )}
          >
            <Mail
              className={cn(
                "h-4 w-4",
                contact.is_read ? "text-gray-400" : "text-gold-600"
              )}
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">
                {contact.name}
              </span>
              {!contact.is_read && <Badge variant="gold">New</Badge>}
            </div>
            <p className="text-xs text-gray-500 truncate">
              {contact.subject || contact.email} &middot;{" "}
              {formatDateShort(contact.created_at)}
            </p>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-gray-400 shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 mb-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Email: </span>
              <a
                href={`mailto:${contact.email}`}
                className="text-navy-600 hover:text-navy-800"
              >
                {contact.email}
              </a>
            </div>
            {contact.phone && (
              <div>
                <span className="font-medium text-gray-700">Phone: </span>
                <span className="text-gray-600">{contact.phone}</span>
              </div>
            )}
            {contact.subject && (
              <div>
                <span className="font-medium text-gray-700">Subject: </span>
                <span className="text-gray-600">{contact.subject}</span>
              </div>
            )}
          </div>
          <div className="rounded-lg bg-white border border-gray-200 p-4 text-sm text-gray-700 whitespace-pre-wrap">
            {contact.message}
          </div>
        </div>
      )}
    </div>
  );
}
