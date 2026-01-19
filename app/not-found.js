import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="text-center animate-fade-in max-w-md">
        {/* Illustration */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-emerald-100 rounded-full animate-pulse" />
          <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-16 h-16 text-emerald-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Oops! Page not found
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          We couldn&apos;t find the page you&apos;re looking for. 
          It might have been moved, or the link might be incorrect.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="btn-primary px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-all"
          >
            Go Home
          </Link>
          <Link
            href="/generate"
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all"
          >
            Create a Taptree
          </Link>
        </div>

        {/* Subtle branding */}
        <p className="mt-12 text-xs text-gray-400">
          Taptree — Your links, beautifully organized
        </p>
      </div>
    </div>
  );
}
