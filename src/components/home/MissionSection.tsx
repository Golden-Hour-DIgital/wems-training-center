import { Shield, Award, BookOpen } from "lucide-react";

export function MissionSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-navy-900">
            Comprehensive EMS Training
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            Williamstown Area EMS Training Center has been certified by the PA
            Department of Health, Bureau of EMS and Emergency Health Services
            Federation as an accredited training institute. We offer comprehensive
            training with highly qualified educators to provide each student with
            the tools needed to be successful pre-hospital providers.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-navy-100">
              <Shield className="h-7 w-7 text-navy-700" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-navy-900">
              PA DoH Certified
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Accredited by the Pennsylvania Department of Health as a certified
              public safety training institute.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gold-100">
              <Award className="h-7 w-7 text-gold-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-navy-900">
              Expert Instructors
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Learn from experienced EMS professionals with high didactic and
              skill-based teaching methods.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-accent-50">
              <BookOpen className="h-7 w-7 text-accent-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-navy-900">
              Continuing Education
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              CE courses to keep your certifications current and advance your
              career in emergency medical services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
