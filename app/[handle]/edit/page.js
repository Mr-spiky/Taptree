"use client";

import React, { useState, useEffect, useRef } from "react";
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

  const routerRef = useRef(router);
  const resolvedHandleRef = useRef(null);
  const hasFetchedRef = useRef(false);
  routerRef.current = router;

  useEffect(() => {
    if (hasFetchedRef.current) return;
    const fetchData = async () => {
      hasFetchedRef.current = true;
      try {
        if (!resolvedHandleRef.current) {
          const resolvedParams = await params;
          resolvedHandleRef.current = resolvedParams.handle;
        }
        const resolvedHandle = resolvedHandleRef.current;
        setHandle(resolvedHandle);

        const response = await fetch(`/api/${resolvedHandle}`);
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
      routerRef.current.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleChange = (index, link, linktext) => {
    setLinks((prev) => prev.map((item, i) => (i === index ? { link, linktext } : item)));
  };

  const addLink = () => setLinks(links.concat([{ linktext: "", link: "" }]));

  const removeLink = (index) => {
    if (links.length > 1) setLinks(links.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    if (!desc.trim()) return "Please enter a bio/description";
    if (!pic.trim()) return "Please enter a profile picture URL";
    const validLinks = links.filter((l) => l.link.trim() && l.linktext.trim());
    if (validLinks.length === 0) return "Please add at least one link with both text and URL";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validateForm();
    if (validationError) { setError(validationError); toast.error(validationError); return; }
    setIsSaving(true);

    try {
      const validLinks = links.filter((l) => l.link.trim() && l.linktext.trim());
      const response = await fetch(`/api/${handle}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link: validLinks, pic: pic.trim(), desc: desc.trim() }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Taptree updated successfully!");
        setTimeout(() => router.push(`/${handle}`), 1000);
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

  const isFormValid = desc.trim() && pic.trim() && links.some((l) => l.link.trim() && l.linktext.trim());

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-brutal-black border-t-transparent rounded-full mx-auto" />
          <p className="mt-4 text-brutal-gray text-sm font-bold">Loading your Taptree...</p>
        </div>
      </div>
    );
  }

  if (error && !links.length) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center brutal-card-static p-8 max-w-sm animate-fade-in">
          <div className="w-16 h-16 bg-brutal-red/10 border-2 border-brutal-red rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">😕</span>
          </div>
          <h1 className="text-2xl font-black text-brutal-black mb-2">Something went wrong</h1>
          <p className="text-brutal-gray mb-6 font-medium">{error}</p>
          <Link href="/dashboard" className="brutal-btn brutal-btn-yellow px-6 py-2.5 text-sm">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-brutal-gray hover:text-brutal-black mb-4 font-bold text-sm uppercase tracking-wide group">
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Dashboard
          </Link>
          <h1 className="text-3xl font-black text-brutal-black">Edit @{handle}</h1>
          <p className="text-brutal-gray mt-1 font-medium">Update your links and profile</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-brutal-red/10 border-2 border-brutal-red rounded-lg text-brutal-red text-sm font-bold flex items-start gap-3 animate-fade-in">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="brutal-card-static p-6 space-y-6 animate-fade-in-up">
          <div className="strip-green h-2 rounded-t-[9px] -mx-6 -mt-6 mb-6" style={{ marginLeft: "-1.5rem", marginRight: "-1.5rem", marginTop: "-1.5rem", borderTopLeftRadius: "9px", borderTopRightRadius: "9px" }} />

          {/* Profile Section */}
          <div>
            <h2 className="text-lg font-black text-brutal-black mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-brutal-green border-2 border-brutal-border rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_#1a1a1a]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              Profile
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="desc" className="label-upper block mb-2">Bio</label>
                <input id="desc" type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="brutal-input" placeholder="Your bio" disabled={isSaving} />
              </div>
              <div>
                <label htmlFor="pic" className="label-upper block mb-2">Profile Picture URL</label>
                <input id="pic" type="url" value={pic} onChange={(e) => setPic(e.target.value)} className="brutal-input" placeholder="https://..." disabled={isSaving} />
              </div>
              {pic && (
                <div className="flex items-center gap-3 animate-fade-in">
                  <img src={pic} alt="Preview" className="w-14 h-14 rounded-lg object-cover shadow-[2px_2px_0px_0px_#1a1a1a]" style={{ borderWidth: "2px", borderColor: "#1a1a1a", borderStyle: "solid" }} onError={(e) => { e.target.style.display = "none"; }} />
                  <div>
                    <span className="text-sm font-bold text-brutal-black block">Preview</span>
                    <span className="text-xs text-brutal-gray">Image will show if URL is valid</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Links Section */}
          <div>
            <h2 className="text-lg font-black text-brutal-black mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-brutal-blue border-2 border-brutal-border rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_#1a1a1a]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              Links
            </h2>
            <div className="space-y-3">
              {links.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-1 space-y-2">
                    <input type="text" value={item.linktext} onChange={(e) => handleChange(index, item.link, e.target.value)} className="brutal-input text-sm" placeholder="Link title (e.g., Instagram)" disabled={isSaving} />
                    <input type="url" value={item.link} onChange={(e) => handleChange(index, e.target.value, item.linktext)} className="brutal-input text-sm" placeholder="https://..." disabled={isSaving} />
                  </div>
                  {links.length > 1 && (
                    <button type="button" onClick={() => removeLink(index)} className="self-center p-2 text-brutal-gray hover:text-brutal-red transition-colors" aria-label="Remove link" disabled={isSaving}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addLink} disabled={isSaving} className="w-full py-2.5 border-2 border-dashed border-brutal-border rounded-lg text-brutal-gray hover:text-brutal-black hover:bg-brutal-bg transition-all text-sm font-bold disabled:opacity-50">
                + Add another link
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4" style={{ borderTopWidth: "2px", borderTopColor: "#e5e5e5", borderTopStyle: "solid" }}>
            <Link href={`/${handle}`} className="flex-1 brutal-btn brutal-btn-outline py-3 text-sm text-center">
              Cancel
            </Link>
            <button type="submit" disabled={!isFormValid || isSaving} className="flex-1 brutal-btn brutal-btn-yellow py-3 text-sm">
              {isSaving ? "Saving..." : "Save Changes →"}
            </button>
          </div>
        </form>

        {/* Preview */}
        <div className="mt-6 text-center animate-fade-in">
          <Link href={`/${handle}`} target="_blank" className="inline-flex items-center gap-2 text-brutal-gray hover:text-brutal-black text-sm font-bold uppercase tracking-wide group">
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
