"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function EditTaptreePage({ params }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [handle, setHandle] = useState("");

  const [links, setLinks] = useState([{ linktext: "", link: "" }]);
  const [pic, setPic] = useState("");
  const [desc, setDesc] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resolvedParams = await params;
        setHandle(resolvedParams.handle);

        const response = await fetch(`/api/${resolvedParams.handle}`);
        const data = await response.json();

        if (data.success) {
          setLinks(data.data.link || [{ linktext: "", link: "" }]);
          setPic(data.data.pic || "");
          setDesc(data.data.desc || "");
        } else {
          setError(data.message);
          toast.error(data.message);
        }
      } catch (err) {
        setError("Failed to load Taptree data");
        toast.error("Failed to load Taptree data");
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchData();
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [params, status, router]);

  const handleChange = (index, link, linktext) => {
    setLinks((initialLinks) => {
      return initialLinks.map((item, i) => {
        if (i === index) {
          return { link, linktext };
        }
        return item;
      });
    });
  };

  const addLink = () => {
    setLinks(links.concat([{ linktext: "", link: "" }]));
  };

  const removeLink = (index) => {
    if (links.length > 1) {
      setLinks(links.filter((_, i) => i !== index));
    }
  };

  const validateForm = () => {
    if (!desc.trim()) {
      return "Please enter a bio/description";
    }
    if (!pic.trim()) {
      return "Please enter a profile picture URL";
    }
    const validLinks = links.filter((l) => l.link.trim() && l.linktext.trim());
    if (validLinks.length === 0) {
      return "Please add at least one link with both text and URL";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    setIsSaving(true);

    try {
      const validLinks = links.filter((l) => l.link.trim() && l.linktext.trim());

      const response = await fetch(`/api/${handle}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          link: validLinks,
          pic: pic.trim(),
          desc: desc.trim(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Taptree updated successfully!");
        setTimeout(() => {
          router.push(`/${handle}`);
        }, 1000);
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    } catch (err) {
      setError("Failed to update Taptree");
      toast.error("Failed to update Taptree");
    } finally {
      setIsSaving(false);
    }
  };

  const isFormValid =
    desc.trim() &&
    pic.trim() &&
    links.some((l) => l.link.trim() && l.linktext.trim());

  // Loading state
  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto" />
          <p className="mt-4 text-gray-500 text-sm">Loading your Taptree...</p>
        </div>
      </div>
    );
  }

  // Determine error type for friendly messaging
  const getErrorContent = () => {
    if (error?.includes("not found")) {
      return {
        icon: (
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        iconBg: "bg-gray-100",
        title: "Taptree not found",
        message: "We couldn't find a Taptree with this handle. It may have been deleted or never existed.",
        cta: "Browse your Taptrees",
      };
    }
    if (error?.includes("permission")) {
      return {
        icon: (
          <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        ),
        iconBg: "bg-amber-50",
        title: "This isn't your Taptree",
        message: "You can only edit Taptrees that you've created. Want to manage your own?",
        cta: "Go to my Taptrees",
      };
    }
    return {
      icon: (
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      iconBg: "bg-red-50",
      title: "Something went wrong",
      message: "We had trouble loading this page. Please try again in a moment.",
      cta: "Back to Dashboard",
    };
  };

  // Error state (no permission or not found)
  if (error && !links.length) {
    const errorContent = getErrorContent();
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center animate-fade-in max-w-sm">
          <div className={`w-16 h-16 ${errorContent.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
            {errorContent.icon}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{errorContent.title}</h1>
          <p className="text-gray-500 mb-6 leading-relaxed">{errorContent.message}</p>
          <Link
            href="/dashboard"
            className="btn-primary inline-flex px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl"
          >
            {errorContent.cta}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4 group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit @{handle}</h1>
          <p className="text-gray-500 mt-1">Update your links and profile</p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-3 animate-fade-in">
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6 animate-fade-in-up animate-delay-100">
          {/* Profile Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              Profile
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <input
                  id="desc"
                  type="text"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow"
                  placeholder="Your bio"
                  disabled={isSaving}
                />
              </div>
              <div>
                <label htmlFor="pic" className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Picture URL
                </label>
                <input
                  id="pic"
                  type="url"
                  value={pic}
                  onChange={(e) => setPic(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow"
                  placeholder="https://..."
                  disabled={isSaving}
                />
              </div>
              {pic && (
                <div className="flex items-center gap-3 animate-fade-in">
                  <div className="relative">
                    <img
                      src={pic}
                      alt="Preview"
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    {/* Fallback for broken image */}
                    <div 
                      className="w-16 h-16 rounded-full bg-emerald-100 items-center justify-center border-2 border-gray-200 shadow-sm"
                      style={{ display: 'none' }}
                    >
                      <span className="text-xl font-bold text-emerald-600">
                        {handle?.charAt(0).toUpperCase() || '?'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 block">Preview</span>
                    <span className="text-xs text-gray-400">Image will show if URL is valid</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Links Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              Links
            </h2>
            <div className="space-y-3">
              {links.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={item.linktext}
                      onChange={(e) => handleChange(index, item.link, e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                      placeholder="Link title (e.g., Instagram)"
                      disabled={isSaving}
                    />
                    <input
                      type="url"
                      value={item.link}
                      onChange={(e) => handleChange(index, e.target.value, item.linktext)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                      placeholder="https://..."
                      disabled={isSaving}
                    />
                  </div>
                  {links.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLink(index)}
                      className="self-center p-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove link"
                      disabled={isSaving}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addLink}
                disabled={isSaving}
                className="w-full py-2.5 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-emerald-400 hover:text-emerald-500 hover:bg-emerald-50/50 transition-all duration-200 text-sm font-medium disabled:opacity-50"
              >
                + Add another link
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Link
              href={`/${handle}`}
              className="flex-1 py-3 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-200"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={!isFormValid || isSaving}
              className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>

        {/* Preview Link */}
        <div className="mt-6 text-center animate-fade-in animate-delay-200">
          <Link
            href={`/${handle}`}
            target="_blank"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 text-sm font-medium group"
          >
            View public page 
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
