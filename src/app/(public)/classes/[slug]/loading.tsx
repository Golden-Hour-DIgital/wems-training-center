export default function ClassDetailLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="h-5 w-32 animate-pulse rounded bg-gray-200 mb-6" />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-2">
            <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />
            <div className="h-6 w-24 animate-pulse rounded-full bg-gray-200" />
          </div>
          <div className="h-10 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="space-y-2 mt-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-4 animate-pulse rounded bg-gray-200"
                style={{ width: `${90 - i * 5}%` }}
              />
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
            <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-5 w-full animate-pulse rounded bg-gray-200" />
            ))}
            <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200 mt-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
