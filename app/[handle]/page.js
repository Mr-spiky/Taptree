import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";
import ProfileImage from "@/components/ProfileImage";
import LinkButton from "@/components/LinkButton";

export default async function Page({ params }) {
  const { handle } = await params;
  const client = await clientPromise;
  const db = client.db("taptree");
  const collection = db.collection("links");

  const item = await collection.findOne({ handle: handle.toLowerCase() });

  if (!item) return notFound();

  const hasLinks = item.link && item.link.length > 0;

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-14 overflow-hidden bg-gradient-to-br from-purple-600 via-fuchsia-600 to-indigo-600">
      
      {/* Soft glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),transparent_60%)]" />
      
      {/* Profile Card */}
      <div className="relative w-full max-w-sm rounded-[2rem] bg-white/90 backdrop-blur-xl border border-white/30 shadow-[0_30px_80px_-20px_rgba(88,28,135,0.45)] p-8 transition-transform duration-300 hover:-translate-y-1">
        
        {/* Profile */}
        <div className="flex flex-col items-center text-center mb-7">
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-md bg-purple-400/40" />
            <ProfileImage src={item.pic} handle={item.handle} />
          </div>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900">
            @{item.handle}
          </h1>

          {item.desc && (
            <p className="mt-2 text-sm leading-relaxed text-gray-600 max-w-[260px]">
              {item.desc}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          {hasLinks ? (
            item.link.map((linkItem, index) => (
              <LinkButton key={index} href={linkItem.link} index={index}>
                {linkItem.linktext}
              </LinkButton>
            ))
          ) : (
            <div className="py-10 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-purple-400">
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-gray-800">
                No links yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                This page will be updated soon
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 border-t border-gray-200/60 pt-4 text-center">
          <Link
            href="/"
            className="text-xs font-medium text-gray-400 transition hover:text-purple-600"
          >
            Create your own TapTree →
          </Link>
        </div>
      </div>
    </div>
  );
}
