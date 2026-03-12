import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import SignOutButton from "./SignOutButton";
import DashboardAvatar from "@/components/DashboardAvatar";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Fetch user's taptrees
  const client = await clientPromise;
  const db = client.db("taptree");
  const linksCollection = db.collection("links");

  const userTaptrees = await linksCollection
    .find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .toArray();

  // Compute total clicks across all taptrees
  const totalClicks = userTaptrees.reduce((acc, t) => acc + (t.totalClicks || 0), 0);

  return (
    <div className="min-h-screen pt-20">

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header Card */}
        <div className="brutal-card-static p-6 mb-8 animate-fade-in relative z-10">
          <div className="strip-blue h-2 rounded-t-[9px] -mx-6 -mt-6 mb-6" style={{ marginLeft: "-1.5rem", marginRight: "-1.5rem", marginTop: "-1.5rem", borderTopLeftRadius: "9px", borderTopRightRadius: "9px" }} />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-brutal-blue border-[3px] border-brutal-border flex items-center justify-center text-brutal-black text-xl font-black shadow-[3px_3px_0px_0px_#1a1a1a]">
                {(session.user.name || session.user.email)?.[0]?.toUpperCase() || "U"}
              </div>
              <div>
                <h1 className="text-2xl font-black text-brutal-black">Welcome back!</h1>
                <p className="text-brutal-gray font-medium">
                  {session.user.name || session.user.email}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/generate"
                className="brutal-btn brutal-btn-green px-5 py-2.5 text-sm hover-wobble flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
                Create Taptree
              </Link>
              <div className="brutal-btn brutal-btn-outline px-5 py-2.5 text-sm hover-wobble">
                <SignOutButton />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 animate-fade-in-up animate-delay-100">
          <div className="brutal-card-static p-4 text-center hover-wobble">
            <div className="strip-yellow h-2 rounded-t-[9px] -mx-4 -mt-4 mb-4" />
            <div className="text-3xl font-black text-brutal-black">{userTaptrees.length}</div>
            <div className="label-upper mt-1.5">Taptrees</div>
          </div>
          <div className="brutal-card-static p-4 text-center hover-wobble">
            <div className="strip-green h-2 rounded-t-[9px] -mx-4 -mt-4 mb-4" />
            <div className="text-3xl font-black text-brutal-black">
              {userTaptrees.reduce((acc, t) => acc + (t.link?.length || 0), 0)}
            </div>
            <div className="label-upper mt-1.5">Total Links</div>
          </div>
          <div className="brutal-card-static p-4 text-center hover-wobble">
            <div className="strip-blue h-2 rounded-t-[9px] -mx-4 -mt-4 mb-4" />
            <div className="text-3xl font-black text-brutal-black">{totalClicks.toLocaleString()}</div>
            <div className="label-upper mt-1.5">Total Clicks</div>
          </div>
          <div className="brutal-card-static p-4 text-center hover-wobble">
            <div className="strip-purple h-2 rounded-t-[9px] -mx-4 -mt-4 mb-4" />
            <div className="text-3xl font-black text-brutal-black">Free</div>
            <div className="label-upper mt-1.5">Plan</div>
          </div>
        </div>

        {/* Taptrees List */}
        <div className="brutal-card-static overflow-hidden animate-fade-in-up animate-delay-200">
          <div className="px-6 py-4 border-b-3 border-brutal-border bg-brutal-yellow" style={{ borderBottomWidth: "3px", borderBottomColor: "#1a1a1a" }}>
            <h2 className="text-lg font-black text-brutal-black uppercase tracking-wide">Your Taptrees</h2>
          </div>

          {userTaptrees.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="w-20 h-20 bg-brutal-yellow border-[3px] border-brutal-border rounded-xl flex items-center justify-center shadow-[4px_4px_0px_0px_#1a1a1a] mx-auto mb-6">
                <svg className="w-10 h-10 text-brutal-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>

              <h3 className="text-2xl font-black text-brutal-black mb-2">Create your first Taptree</h3>
              <p className="text-brutal-gray mb-8 max-w-sm mx-auto font-medium">
                Share all your important links in one place. It only takes 30 seconds to get started!
              </p>

              <Link href="/generate" className="brutal-btn brutal-btn-yellow px-8 py-4 hover-wobble text-base">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
                Create Taptree
              </Link>

              <div className="mt-12 pt-8 border-t-[3px] border-brutal-border grid grid-cols-3 gap-6 text-center max-w-md mx-auto">
                <div>
                  <div className="text-2xl font-black text-brutal-black">∞</div>
                  <div className="label-upper mt-1">Unlimited Links</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-brutal-black">30s</div>
                  <div className="label-upper mt-1">Quick Setup</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-brutal-black">Free</div>
                  <div className="label-upper mt-1">Forever</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="divide-y-0">
              {userTaptrees.map((taptree, index) => (
                <div
                  key={taptree._id.toString()}
                  className="group px-6 py-6 border-b-[3px] border-brutal-border last:border-0 hover:bg-brutal-bg transition-colors animate-fade-in"
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <DashboardAvatar src={taptree.pic} handle={taptree.handle} linkCount={taptree.link?.length || 0} />
                      <div>
                        <h3 className="text-xl font-black text-brutal-black">
                          @{taptree.handle}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-sm font-bold text-brutal-gray">
                          <span>{taptree.link?.length || 0} link{taptree.link?.length !== 1 ? "s" : ""}</span>
                          <span>•</span>
                          <span className="text-brutal-black">{(taptree.totalClicks || 0).toLocaleString()} clicks</span>
                          <span>•</span>
                          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brutal-green border-[1.5px] border-brutal-border" /> Active</span>
                        </div>
                      </div>
                    </div>
                    {/* Desktop action buttons */}
                    <div className="hidden sm:flex items-center gap-3">
                      <Link href={`/${taptree.handle}`} target="_blank" className="brutal-btn brutal-btn-outline px-4 py-2 text-xs hover-wobble">
                        View
                      </Link>
                      <Link href={`/${taptree.handle}/edit`} className="brutal-btn brutal-btn-yellow px-4 py-2 text-xs hover-wobble">
                        Edit
                      </Link>
                    </div>
                    {/* Mobile action buttons */}
                    <div className="flex items-center gap-2 sm:hidden">
                      <Link href={`/${taptree.handle}`} target="_blank" className="brutal-btn brutal-btn-outline px-3 py-1.5 text-xs">
                        View
                      </Link>
                      <Link href={`/${taptree.handle}/edit`} className="brutal-btn brutal-btn-yellow px-3 py-1.5 text-xs">
                        Edit
                      </Link>
                    </div>
                  </div>

                  {/* Per-link click analytics */}
                  {taptree.link && taptree.link.length > 0 && (
                    <details className="mt-4 ml-[4.5rem] group/details">
                      <summary className="cursor-pointer text-xs font-black uppercase tracking-wide text-brutal-gray hover:text-brutal-black transition-colors select-none flex items-center gap-2 w-max brutal-badge bg-brutal-bg hover:bg-brutal-yellow">
                        <svg className="w-3.5 h-3.5 transition-transform duration-200 group-open/details:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                        View link analytics
                      </summary>
                      <div className="mt-4 space-y-3 p-4 border-[3px] border-brutal-border rounded-xl bg-white shadow-[4px_4px_0px_0px_#1a1a1a]">
                        {taptree.link.map((l, i) => {
                          const clicks = l.clicks || 0;
                          const maxClicks = Math.max(...taptree.link.map((x) => x.clicks || 0), 1);
                          const barWidth = Math.round((clicks / maxClicks) * 100);

                          return (
                            <div key={i} className="flex flex-col gap-1 text-sm">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-brutal-black truncate" title={l.linktext}>
                                  {l.linktext}
                                </span>
                                <span className="font-black text-brutal-black ml-2 shrink-0">
                                  {clicks.toLocaleString()}
                                </span>
                              </div>
                              <div className="h-2.5 w-full bg-brutal-bg border-2 border-brutal-border rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-brutal-yellow transition-all duration-500"
                                  style={{ width: `${barWidth}%`, borderRightWidth: barWidth > 0 ? "2px" : "0", borderColor: "#1a1a1a", borderStyle: "solid" }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </details>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Tips Card */}
        {userTaptrees.length > 0 && (
          <div className="mt-8 brutal-card-static p-6 bg-brutal-green hover-wobble cursor-pointer transition-transform animate-fade-in-up animate-delay-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white border-[3px] border-brutal-border flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#1a1a1a]">
                <svg className="w-6 h-6 text-brutal-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-black text-brutal-black mb-1">Pro Tip</h3>
                <p className="text-brutal-black font-semibold text-sm max-w-xl">Share your Taptree link in your social media bios to drive more traffic to all your content in one click!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
