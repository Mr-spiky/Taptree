"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import TaptreeLogo from "@/components/TaptreeLogo";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Contact" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav
      className={`sticky top-0 z-50 bg-white border-b-3 border-brutal-border transition-all ${scrolled ? "navbar-scrolled" : ""
        }`}
      style={{ borderBottomWidth: "3px", borderBottomColor: "#1a1a1a" }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center group hover-wobble">
            <TaptreeLogo size={40} showText textClass="text-brutal-black" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link-crazy ${isActive(link.href) ? "text-brutal-blue" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 border-2 border-brutal-border rounded-lg">
                  <div className="w-7 h-7 bg-brutal-yellow border-2 border-brutal-border rounded-md flex items-center justify-center">
                    <span className="text-xs font-black">{session.user?.name?.[0]?.toUpperCase() || "U"}</span>
                  </div>
                  <span className="text-sm font-bold text-brutal-black">{session.user?.name}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="text-sm font-bold text-brutal-gray hover:text-brutal-black uppercase tracking-wide transition-colors"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="nav-link-crazy text-sm mr-2">
                  Sign in
                </Link>
                <Link href="/signup" className="brutal-btn brutal-btn-yellow px-6 py-2.5 text-sm group relative overflow-hidden">
                  <span className="relative z-10 group-hover:-translate-y-12 transition-transform duration-300 block">Sign up</span>
                  <span className="absolute inset-0 flex items-center justify-center z-10 translate-y-12 group-hover:translate-y-0 transition-transform duration-300 bg-brutal-black text-brutal-yellow w-full h-full font-black">
                    LET'S GO!
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 border-2 border-brutal-border rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t-3 bg-white animate-fade-in" style={{ borderTopWidth: "3px", borderTopColor: "#1a1a1a" }}>
          <div className="px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 text-sm font-bold uppercase tracking-wide rounded-lg transition-colors ${isActive(link.href)
                  ? "bg-brutal-yellow text-brutal-black"
                  : "text-brutal-gray hover:bg-gray-100 hover:text-brutal-black"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-3" style={{ borderTopWidth: "2px", borderTopColor: "#e5e5e5", borderTopStyle: "solid" }}>
              {session ? (
                <button
                  onClick={() => { signOut(); setMobileOpen(false); }}
                  className="block w-full text-left px-4 py-3 text-sm font-bold text-brutal-gray uppercase tracking-wide hover:text-brutal-black hover:bg-gray-100 rounded-lg"
                >
                  Sign out
                </button>
              ) : (
                <Link
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center brutal-btn brutal-btn-yellow w-full py-3 text-sm"
                >
                  Sign up
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
