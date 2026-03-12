"use client";

import React, { Suspense, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import ErrorAlert from "@/components/ErrorAlert";

const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  { ssr: false }
);

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GenerateForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [links, setLinks] = useState([{ linktext: "", link: "" }]);
  const [handle, setHandle] = useState(searchParams.get("handle") || "");
  const [pic, setPic] = useState("");
  const [desc, setDesc] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState(null); // { code, context, message }

  const handleChange = useCallback((index, link, linktext) => {
    setLinks((prev) =>
      prev.map((item, i) => (i === index ? { link, linktext } : item))
    );
  }, []);

  const addLink = useCallback(() => {
    setLinks((prev) => [...prev, { linktext: "", link: "" }]);
  }, []);

  const removeLink = useCallback((index) => {
    setLinks((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== index) : prev
    );
  }, []);

  const validateForm = useCallback(() => {
    if (!handle.trim()) return { code: "MISSING_FIELD", message: "Please enter a handle", context: { field: "handle" } };
    if (!/^[a-zA-Z0-9._-]+$/.test(handle)) return { code: "INVALID_HANDLE", message: "Invalid handle format" };
    if (!desc.trim()) return { code: "MISSING_FIELD", message: "Please enter a bio", context: { field: "bio" } };
    if (!pic.trim()) return { code: "MISSING_FIELD", message: "Please enter a profile picture URL", context: { field: "profile picture" } };
    const validLinks = links.filter((l) => l.link.trim() && l.linktext.trim());
    if (validLinks.length === 0) return { code: "MISSING_FIELD", message: "Add at least one link", context: { field: "links" } };
    return null;
  }, [handle, desc, pic, links]);

  const submitLinks = async (e) => {
    e.preventDefault();
    setErrorInfo(null);

    const validationError = validateForm();
    if (validationError) {
      setErrorInfo(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const validLinks = links.filter((l) => l.link.trim() && l.linktext.trim());

      const response = await fetch("/api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          link: validLinks,
          handle: handle.trim(),
          pic: pic.trim(),
          desc: desc.trim(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Taptree created successfully!");
        setTimeout(() => {
          router.push(`/${encodeURIComponent(handle.trim().toLowerCase())}`);
        }, 1000);
      } else {
        setErrorInfo({
          code: result.errorCode || "NETWORK_ERROR",
          message: result.message,
          context: { handle: handle.trim() },
        });
        toast.error(result.message || "Something went wrong.");
      }
    } catch (err) {
      setErrorInfo({ code: "NETWORK_ERROR", message: err.message });
      toast.error("Failed to create Taptree. Check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    handle.trim() &&
    desc.trim() &&
    pic.trim() &&
    links.some((l) => l.link.trim() && l.linktext.trim());

  // Step badge component
  const StepBadge = ({ number, color }) => (
    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg ${color} border-[2.5px] border-brutal-border text-xs font-black shadow-[2px_2px_0px_0px_#1a1a1a]`}>
      {number}
    </span>
  );

  return (
    <div className="min-h-screen pt-20">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* === LEFT: Form === */}
          <div className="lg:col-span-3 animate-fade-in-up">
            <div className="brutal-card-static overflow-hidden">
              {/* Header */}
              <div className="px-6 py-5 border-b-[3px] border-brutal-border bg-brutal-yellow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white border-[3px] border-brutal-border rounded-xl flex items-center justify-center shadow-[3px_3px_0px_0px_#1a1a1a]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-xl font-black text-brutal-black uppercase tracking-wide">Create your Taptree</h1>
                    <p className="text-xs font-bold text-brutal-black/60">Set up your link-in-bio in seconds</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Error */}
                {errorInfo && (
                  <ErrorAlert
                    errorCode={errorInfo.code}
                    message={errorInfo.message}
                    context={errorInfo.context}
                    onDismiss={() => setErrorInfo(null)}
                  />
                )}

                <form onSubmit={submitLinks} className="space-y-7">
                  {/* Step 1: Handle */}
                  <div>
                    <label className="flex items-center gap-2.5 mb-3">
                      <StepBadge number="1" color="bg-brutal-yellow" />
                      <span className="text-sm font-black text-brutal-black uppercase tracking-wide">Claim your handle</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brutal-gray text-sm font-bold select-none">
                        taptree.com/
                      </span>
                      <input
                        type="text"
                        value={handle}
                        onChange={(e) => { setHandle(e.target.value); setErrorInfo(null); }}
                        className="brutal-input pl-28"
                        placeholder="yourname"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Step 2: Links */}
                  <div>
                    <label className="flex items-center gap-2.5 mb-3">
                      <StepBadge number="2" color="bg-brutal-green" />
                      <span className="text-sm font-black text-brutal-black uppercase tracking-wide">Add your links</span>
                    </label>
                    <div className="space-y-3">
                      {links.map((item, index) => (
                        <div key={index} className="flex gap-2 animate-fade-in" style={{ animationDelay: `${index * 80}ms` }}>
                          <div className="flex-1 space-y-2">
                            <input
                              type="text"
                              value={item.linktext}
                              onChange={(e) => handleChange(index, item.link, e.target.value)}
                              className="brutal-input text-sm"
                              placeholder="Link title (e.g., Instagram)"
                              disabled={isLoading}
                            />
                            <input
                              type="url"
                              value={item.link}
                              onChange={(e) => handleChange(index, e.target.value, item.linktext)}
                              className="brutal-input text-sm"
                              placeholder="https://..."
                              disabled={isLoading}
                            />
                          </div>
                          {links.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeLink(index)}
                              className="self-center p-2 brutal-btn brutal-btn-outline text-xs hover-wobble"
                              aria-label="Remove link"
                              disabled={isLoading}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addLink}
                        disabled={isLoading}
                        className="w-full py-3 border-[3px] border-dashed border-brutal-border rounded-xl text-brutal-gray hover:border-brutal-green hover:text-brutal-black hover:bg-brutal-green/10 transition-all duration-200 text-sm font-black uppercase tracking-wide disabled:opacity-50"
                      >
                        + Add another link
                      </button>
                    </div>
                  </div>

                  {/* Step 3: Profile */}
                  <div>
                    <label className="flex items-center gap-2.5 mb-3">
                      <StepBadge number="3" color="bg-brutal-blue" />
                      <span className="text-sm font-black text-brutal-black uppercase tracking-wide">Add your profile</span>
                    </label>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className="brutal-input"
                        placeholder="Your bio (e.g., Developer & Creator)"
                        disabled={isLoading}
                      />
                      <input
                        type="url"
                        value={pic}
                        onChange={(e) => setPic(e.target.value)}
                        className="brutal-input"
                        placeholder="Profile picture URL (https://...)"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!isFormValid || isLoading}
                    className="brutal-btn brutal-btn-yellow w-full py-4 text-sm hover-wobble disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Creating...
                      </span>
                    ) : (
                      "Create Taptree →"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* === RIGHT: Live Preview === */}
          <div className="lg:col-span-2 hidden lg:block animate-fade-in-up animate-delay-200">
            <div className="sticky top-28">
              <div className="text-xs font-black text-brutal-gray uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brutal-green border-[1.5px] border-brutal-border animate-pulse" />
                Live Preview
              </div>

              <div className="brutal-card-static p-6 text-center">
                <div className="strip-purple h-2 rounded-t-[9px] -mx-6 -mt-6 mb-6" style={{ marginLeft: "-1.5rem", marginRight: "-1.5rem", marginTop: "-1.5rem", borderTopLeftRadius: "9px", borderTopRightRadius: "9px" }} />

                {/* Avatar preview */}
                <div className="mb-4 flex justify-center">
                  {pic.trim() ? (
                    <img
                      src={pic}
                      alt="Preview"
                      className="w-20 h-20 rounded-xl border-[3px] border-brutal-border object-cover shadow-[3px_3px_0px_0px_#1a1a1a]"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-xl border-[3px] border-brutal-border bg-brutal-bg flex items-center justify-center shadow-[3px_3px_0px_0px_#1a1a1a]">
                      <svg className="w-8 h-8 text-brutal-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Handle */}
                <h2 className="text-lg font-black text-brutal-black">
                  @{handle.trim() || "yourname"}
                </h2>

                {/* Bio */}
                <p className="mt-1 text-xs text-brutal-gray font-medium">
                  {desc.trim() || "Your bio goes here"}
                </p>

                {/* Links preview */}
                <div className="flex flex-col gap-2.5 mt-6">
                  {links.filter((l) => l.linktext.trim()).length > 0 ? (
                    links
                      .filter((l) => l.linktext.trim())
                      .map((l, i) => (
                        <div
                          key={i}
                          className="link-button text-sm"
                        >
                          {l.linktext}
                        </div>
                      ))
                  ) : (
                    <div className="py-6 text-brutal-gray text-xs font-bold">
                      Your links will appear here
                    </div>
                  )}
                </div>

                {/* Branding */}
                <div className="mt-6 pt-4" style={{ borderTopWidth: "2px", borderTopColor: "#e5e5e5", borderTopStyle: "solid" }}>
                  <span className="text-[10px] font-black text-brutal-gray uppercase tracking-widest">
                    Powered by Taptree
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const Generate = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-brutal-black border-t-transparent rounded-full" />
        </div>
      }
    >
      <GenerateForm />
    </Suspense>
  );
};

export default Generate;
