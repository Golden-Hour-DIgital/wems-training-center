import { formatCurrency, formatDate } from "@/lib/utils/format";
import type { Class } from "@/types/database";

interface Props {
  classData: Class;
}

export function PaymentSummary({ classData }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-navy-900 mb-4">
        Order Summary
      </h3>

      <div className="space-y-3 text-sm">
        <div>
          <p className="font-medium text-gray-900">{classData.title}</p>
          <p className="text-gray-500">{formatDate(classData.date_start)}</p>
        </div>

        {classData.time_details && (
          <p className="text-gray-500">{classData.time_details}</p>
        )}

        <p className="text-gray-500">{classData.location}</p>

        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Course Fee</span>
            <span className="font-medium text-gray-900">
              {formatCurrency(classData.price_cents)}
            </span>
          </div>
          <div className="flex justify-between mt-2 text-lg font-bold text-navy-900">
            <span>Total</span>
            <span>{formatCurrency(classData.price_cents)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
