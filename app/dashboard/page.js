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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-stone-50 to-slate-100 pt-20  bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header Card */}
        <div className="bg-stone-50/90 backdrop-blur-sm rounded-2xl shadow-sm border border-stone-200 p-6 mb-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-emerald-500/20">
                {(session.user.name || session.user.email)?.[0]?.toUpperCase() || "U"}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
                <p className="text-gray-500">
                  {session.user.name || session.user.email}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href="/generate"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-xl shadow-md shadow-emerald-500/20 transition-all hover:shadow-lg hover:shadow-emerald-500/30"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Taptree
              </Link>
              <SignOutButton />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 animate-fade-in-up animate-delay-100">
          <div className="bg-amber-50/80 backdrop-blur-sm rounded-xl p-4 border border-amber-100 shadow-sm">
            <div className="text-3xl font-bold text-emerald-600">{userTaptrees.length}</div>
            <div className="text-sm text-stone-600 mt-1">Taptrees</div>
          </div>
          <div className="bg-emerald-50/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-100 shadow-sm">
            <div className="text-3xl font-bold text-teal-600">
              {userTaptrees.reduce((acc, t) => acc + (t.link?.length || 0), 0)}
            </div>
            <div className="text-sm text-stone-600 mt-1">Total Links</div>
          </div>
          <div className="bg-teal-50/80 backdrop-blur-sm rounded-xl p-4 border border-teal-100 shadow-sm">
            <div className="text-3xl font-bold text-amber-500">∞</div>
            <div className="text-sm text-stone-600 mt-1">Unlimited</div>
          </div>
          <div className="bg-purple-50/80 backdrop-blur-sm rounded-xl p-4 border border-purple-100 shadow-sm">
            <div className="text-3xl font-bold text-purple-500">Free</div>
            <div className="text-sm text-stone-600 mt-1">Plan</div>
          </div>
        </div>

        {/* Taptrees List */}
        <div className="bg-stone-50/90 backdrop-blur-sm rounded-2xl shadow-sm border border-stone-200 overflow-hidden animate-fade-in-up animate-delay-200">
          <div className="px-6 py-4 border-b border-stone-200 bg-gradient-to-r from-stone-100/80 to-amber-50/50">
            <h2 className="text-lg font-semibold text-gray-800">Your Taptrees</h2>
          </div>

          {userTaptrees.length === 0 ? (
            <div className="px-6 py-16  text-center">
              {/* Empty State Illustration */}
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0  from-emerald-200 to-teal-200 rounded-full animate-pulse" />
                <div className="relative w-full h-full  from-emerald-50 to-teal-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Create your first Taptree
              </h3>
              <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                Share all your important links in one place. It only takes 30 seconds to get started!
              </p>
              
              <Link
                href="/generate"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-xl shadow-md shadow-emerald-500/20 transition-all hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Taptree
              </Link>
              
              {/* Feature hints */}
              <div className="mt-10 pt-8 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-xl bg-emerald-50/50">
                  <div className="text-2xl font-bold text-emerald-600">∞</div>
                  <div className="text-xs text-gray-500 mt-1">Unlimited Links</div>
                </div>
                <div className="p-3 rounded-xl bg-teal-50/50">
                  <div className="text-2xl font-bold text-teal-600">30s</div>
                  <div className="text-xs text-gray-500 mt-1">Quick Setup</div>
                </div>
                <div className="p-3 rounded-xl bg-amber-50/50">
                  <div className="text-2xl font-bold text-amber-500">Free</div>
                  <div className="text-xs text-gray-500 mt-1">Forever</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {userTaptrees.map((taptree, index) => (
                <div
                  key={taptree._id.toString()}
                  className="group px-6 py-5 flex items-center justify-between hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <DashboardAvatar 
                      src={taptree.pic} 
                      handle={taptree.handle} 
                      linkCount={taptree.link?.length || 0} 
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                        @{taptree.handle}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {taptree.link?.length || 0} link{taptree.link?.length !== 1 ? 's' : ''} • 
                        <span className="text-emerald-600 ml-1">Active</span>
                      </p>
                    </div>
                  </div>
                  {/* Desktop action buttons */}
                  <div className="hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Link
                      href={`/${taptree.handle}`}
                      target="_blank"
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
                      title="View public page"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View
                    </Link>
                    <Link
                      href={`/${taptree.handle}/edit`}
                      className="px-4 py-2 text-sm text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-2"
                      title="Edit Taptree"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Link>
                  </div>
                  {/* Always visible on mobile */}
                  <div className="flex items-center gap-2 sm:hidden">
                    <Link
                      href={`/${taptree.handle}`}
                      target="_blank"
                      className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-lg"
                    >
                      View
                    </Link>
                    <Link
                      href={`/${taptree.handle}/edit`}
                      className="px-3 py-1.5 text-sm text-white bg-emerald-600 rounded-lg"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Tips Card */}
        {userTaptrees.length > 0 && (
          <div className="mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white animate-fade-in-up animate-delay-300">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Pro Tip</h3>
                <p className="text-white/80 text-sm">Share your Taptree link in your social media bios to drive more traffic to all your content in one click!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
