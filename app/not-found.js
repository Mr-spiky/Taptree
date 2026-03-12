import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center animate-fade-in-up max-w-md">
        <div className="brutal-card-static p-10 relative overflow-hidden">
          <div className="strip-yellow h-2 rounded-t-[9px] -mx-10 -mt-10 mb-8" style={{ marginLeft: "-2.5rem", marginRight: "-2.5rem", marginTop: "-2.5rem", borderTopLeftRadius: "9px", borderTopRightRadius: "9px" }} />

          {/* Big 404 */}
          <div className="text-8xl font-black text-brutal-black mb-2 tracking-tighter">
            404
          </div>

          <h1 className="text-2xl font-black text-brutal-black mb-3">
            Page not found
          </h1>
          <p className="text-brutal-gray font-medium mb-8 leading-relaxed">
            We couldn&apos;t find the page you&apos;re looking for.
            It might have been moved, or the link might be incorrect.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="brutal-btn brutal-btn-yellow px-6 py-3 text-sm hover-wobble"
            >
              Go Home
            </Link>
            <Link
              href="/generate"
              className="brutal-btn brutal-btn-outline px-6 py-3 text-sm hover-wobble"
            >
              Create a Taptree
            </Link>
          </div>

          <p className="mt-10 text-xs font-bold text-brutal-gray uppercase tracking-widest">
            Taptree — Your links, beautifully organized
          </p>
        </div>
      </div>
    </div>
  );
}
