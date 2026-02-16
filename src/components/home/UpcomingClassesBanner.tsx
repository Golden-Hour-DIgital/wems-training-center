import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ClassCard } from "@/components/classes/ClassCard";
import type { ClassWithCount } from "@/types/database";

interface Props {
  classes: ClassWithCount[];
}

export function UpcomingClassesBanner({ classes }: Props) {
  if (classes.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-navy-900">
              Upcoming Classes
            </h2>
            <p className="mt-2 text-gray-600">
              Register now for our latest course offerings.
            </p>
          </div>
          <Link href="/classes" className="hidden sm:block">
            <Button variant="outline">View All Classes</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((cls) => (
            <ClassCard key={cls.id} classData={cls} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/classes">
            <Button variant="outline">View All Classes</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
