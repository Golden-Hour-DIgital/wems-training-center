import Link from "next/link";
import { Calendar, Clock, MapPin, DollarSign, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import type { ClassWithCount } from "@/types/database";

const classTypeLabels: Record<string, string> = {
  "emt-b": "EMT-B",
  "ce-course": "CE Course",
  "cpr-aed": "CPR/AED",
  acls: "ACLS",
  pals: "PALS",
  other: "Other",
};

interface Props {
  classData: ClassWithCount;
}

export function ClassCard({ classData }: Props) {
  const spotsRemaining = classData.capacity - classData.registration_count;
  const isFull = classData.is_full || spotsRemaining <= 0;

  return (
    <Link href={`/classes/${classData.slug}`}>
      <Card hover className="h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <Badge variant="navy">
            {classTypeLabels[classData.class_type] || classData.class_type}
          </Badge>
          {classData.ce_hours && (
            <Badge variant="gold">{classData.ce_hours} CE Hours</Badge>
          )}
        </div>

        <h3 className="text-lg font-semibold text-navy-900 mb-2">
          {classData.title}
        </h3>

        {classData.short_description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {classData.short_description}
          </p>
        )}

        <div className="mt-auto space-y-2 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4 text-navy-500" />
            <span>{formatDate(classData.date_start)}</span>
          </div>

          {classData.time_details && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4 text-navy-500" />
              <span>{classData.time_details}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-navy-500" />
            <span className="truncate">{classData.location}</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-bold text-navy-900">
              {formatCurrency(classData.price_cents)}
            </span>
            <div className="flex items-center gap-1 text-sm">
              <Users className="h-4 w-4" />
              {isFull ? (
                <span className="font-medium text-accent-500">Full</span>
              ) : (
                <span className="text-gray-600">
                  {spotsRemaining} spot{spotsRemaining !== 1 ? "s" : ""} left
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
