"use client";

import React, { Suspense, useState, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Lazy load ToastContainer - only loaded when needed
const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  { ssr: false }
);

// Import toast function directly (small, tree-shakeable)
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Separate component that uses useSearchParams
function GenerateForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [links, setLinks] = useState([{ linktext: "", link: "" }]);
  const [handle, setHandle] = useState(searchParams.get("handle") || "");
  const [pic, setPic] = useState("");
  const [desc, setDesc] = useState("");

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Memoized handlers to prevent recreating on every render
  const handleChange = useCallback((index, link, linktext) => {
    setLinks((initialLinks) => {
      return initialLinks.map((item, i) => {
        if (i === index) {
          return { link, linktext };
        } else {
          return item;
        }
      });
    });
  }, []);

  const addLink = useCallback(() => {
    setLinks(prev => [...prev, { linktext: "", link: "" }]);
  }, []);

  const removeLink = useCallback((index) => {
    setLinks(prev => prev.length > 1 ? prev.filter((_, i) => i !== index) : prev);
  }, []);

  // Validation - memoized
  const validateForm = useCallback(() => {
    if (!handle.trim()) {
      return "Please enter a handle";
    }
    if (!/^[a-zA-Z0-9._-]+$/.test(handle)) {
      return "Handle can only contain letters, numbers, dots, underscores, and hyphens";
    }
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
  }, [handle, desc, pic, links]);

  const submitLinks = async (e) => {
    e.preventDefault();
    setError("");

    // Validate
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      // Filter out empty links
      const validLinks = links.filter((l) => l.link.trim() && l.linktext.trim());

      const response = await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          link: validLinks,
          handle: handle.trim(),
          pic: pic.trim(),
          desc: desc.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Network error. Please try again.");
      }

      const result = await response.json();

      if (result.success) {
        toast.success("Taptree created successfully!");
        // Redirect to the new Taptree page after a short delay (use lowercase)
        setTimeout(() => {
          router.push(`/${encodeURIComponent(handle.trim().toLowerCase())}`);
        }, 1000);
      } else {
        toast.error(result.message || "Something went wrong. Please try again.");
        setError(result.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      toast.error(err.message || "Failed to create Taptree. Please check your connection.");
      setError(err.message || "Failed to create Taptree. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    handle.trim() &&
    desc.trim() &&
    pic.trim() &&
    links.some((l) => l.link.trim() && l.linktext.trim());

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-100 via-pink-50 to-amber-50">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Background Image - Hidden on mobile, shown on larger screens */}
      <div className="hidden lg:block fixed inset-0 z-0">
        <img
          src="/img/generate1.jpg"
          alt=""
          className="h-full w-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Form Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-24 sm:px-6 lg:px-8">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-linear-to-br from-pink-500 to-violet-500 rounded-2xl mb-4 shadow-lg animate-scale-in">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Create your Taptree
              </h1>
              <p className="text-gray-500">
                Set up your link in bio page in seconds
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-3"
                role="alert"
              >
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

            <form onSubmit={submitLinks} className="space-y-6">
              {/* Step 1: Handle */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  <span className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-pink-100 text-pink-600 text-xs font-bold">
                      1
                    </span>
                    Claim your handle
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm select-none">
                    taptree.com/
                  </span>
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="w-full pl-28 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-shadow"
                    placeholder="yourname"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Step 2: Links */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  <span className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-pink-100 text-pink-600 text-xs font-bold">
                      2
                    </span>
                    Add your links
                  </span>
                </label>
                <div className="space-y-3">
                  {links.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={item.linktext}
                          onChange={(e) => handleChange(index, item.link, e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-shadow text-sm"
                          placeholder="Link title (e.g., Instagram)"
                          disabled={isLoading}
                        />
                        <input
                          type="url"
                          value={item.link}
                          onChange={(e) => handleChange(index, e.target.value, item.linktext)}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-shadow text-sm"
                          placeholder="https://..."
                          disabled={isLoading}
                        />
                      </div>
                      {links.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLink(index)}
                          className="self-center p-2 text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Remove link"
                          disabled={isLoading}
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
                    disabled={isLoading}
                    className="w-full py-2.5 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-pink-400 hover:text-pink-500 hover:bg-pink-50/50 transition-all duration-200 text-sm font-medium disabled:opacity-50"
                  >
                    + Add another link
                  </button>
                </div>
              </div>

              {/* Step 3: Profile */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  <span className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-pink-100 text-pink-600 text-xs font-bold">
                      3
                    </span>
                    Add your profile
                  </span>
                </label>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-shadow"
                    placeholder="Your bio (e.g., Developer & Creator)"
                    disabled={isLoading}
                  />
                  <input
                    type="url"
                    value={pic}
                    onChange={(e) => setPic(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-shadow"
                    placeholder="Profile picture URL"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="w-full py-4 bg-linear-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Creating your Taptree...
                  </>
                ) : (
                  "Create Taptree"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
const Generate = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-linear-to-br from-rose-400 via-pink-400 to-orange-300 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full" />
        </div>
      }
    >
      <GenerateForm />
    </Suspense>
  );
};

export default Generate;
