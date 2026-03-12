import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";
import ProfileImage from "@/components/ProfileImage";
import LinkButton from "@/components/LinkButton";
import ShareButton from "@/components/ShareButton";
import TaptreeLogo from "@/components/TaptreeLogo";

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const client = await clientPromise;
  const db = client.db("taptree");
  const item = await db.collection("links").findOne(
    { handle: handle.toLowerCase() },
    { projection: { handle: 1, desc: 1, pic: 1 } }
  );

  if (!item) {
    return { title: "Not Found" };
  }

  const title = `@${item.handle}`;
  const description = item.desc || `Check out @${item.handle}'s links on Taptree`;

  return {
    title,
    description,
    openGraph: {
      title: `@${item.handle} | Taptree`,
      description,
      type: "profile",
      ...(item.pic && { images: [{ url: item.pic, width: 400, height: 400, alt: `@${item.handle}` }] }),
    },
    twitter: {
      title: `@${item.handle} | Taptree`,
      description,
      ...(item.pic && { images: [item.pic] }),
    },
  };
}

export default async function Page({ params }) {
  const { handle } = await params;
  const client = await clientPromise;
  const db = client.db("taptree");
  const collection = db.collection("links");

  const item = await collection.findOne({ handle: handle.toLowerCase() });
  if (!item) return notFound();

  const hasLinks = item.link && item.link.length > 0;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-14">
      <div className="w-full max-w-sm animate-fade-in-up">
        <div className="brutal-card-static p-8 text-center relative overflow-hidden">
          {/* Purple strip */}
          <div className="strip-purple h-2 rounded-t-[9px] -mx-8 -mt-8 mb-8" style={{ marginLeft: "-2rem", marginRight: "-2rem", marginTop: "-2rem", borderTopLeftRadius: "9px", borderTopRightRadius: "9px" }} />

          {/* Decorative dot pattern behind avatar */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-32 h-32 opacity-[0.08] pointer-events-none" aria-hidden="true">
            <svg width="128" height="128" viewBox="0 0 128 128">
              {Array.from({ length: 64 }).map((_, i) => (
                <circle
                  key={i}
                  cx={(i % 8) * 18 + 5}
                  cy={Math.floor(i / 8) * 18 + 5}
                  r="3"
                  fill="#1a1a1a"
                />
              ))}
            </svg>
          </div>

          {/* Avatar */}
          <div className="mb-4 flex justify-center relative z-10">
            <ProfileImage src={item.pic} handle={item.handle} />
          </div>

          <h1 className="text-2xl font-black tracking-tight text-brutal-black animate-fade-in">
            @{item.handle}
          </h1>

          {item.desc && (
            <p className="mt-2 text-sm text-brutal-gray font-medium max-w-[260px] mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "100ms" }}>
              {item.desc}
            </p>
          )}

          {/* Links */}
          <div className="flex flex-col gap-3 mt-8">
            {hasLinks ? (
              item.link.map((linkItem, index) => (
                <LinkButton
                  key={index}
                  href={linkItem.link}
                  handle={item.handle}
                  linkIndex={index}
                  index={index}
                >
                  {linkItem.linktext}
                </LinkButton>
              ))
            ) : (
              <div className="py-10">
                <div className="w-14 h-14 bg-brutal-bg border-2 border-brutal-border rounded-lg flex items-center justify-center mx-auto mb-3 shadow-[2px_2px_0px_0px_#1a1a1a]">
                  <svg className="w-6 h-6 text-brutal-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="font-black text-brutal-black">No links yet</h3>
                <p className="text-sm text-brutal-gray mt-1">This page will be updated soon</p>
              </div>
            )}
          </div>

          {/* Share + Branding */}
          <div className="mt-10 pt-5 flex flex-col items-center gap-4" style={{ borderTopWidth: "2px", borderTopColor: "#e5e5e5", borderTopStyle: "solid" }}>
            <ShareButton handle={item.handle} />

            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-brutal-gray uppercase tracking-wider hover:text-brutal-black transition-colors group">
              <TaptreeLogo size={20} />
              Create your own Taptree
              <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
