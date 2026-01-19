import Link from "next/link";

export default function HandleNotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center px-4 py-12">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center animate-scale-in">
        {/* Illustration */}
        <div className="w-20 h-20 mx-auto mb-6 bg-purple-50 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-purple-300"
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

        {/* Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Taptree not found
        </h1>
        <p className="text-gray-500 mb-6 text-sm leading-relaxed">
          This handle doesn&apos;t exist yet. Maybe it&apos;s waiting for you to claim it?
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href="/generate"
            className="w-full py-3 bg-linear-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all"
          >
            Claim this handle
          </Link>
          <Link
            href="/"
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all"
          >
            Go Home
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-gray-400">
          Looking for someone? Double-check the spelling.
        </p>
      </div>
    </div>
  );
}
