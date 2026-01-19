"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Pages where navbar should be shown
  const showNavbar = ["/", "/generate", "/dashboard", "/examples", "/pricing", "/login", "/signup"].includes(pathname);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (!showNavbar) return null;

  // Check if link is active
  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false; // Hash links never "active"
    return pathname.startsWith(href);
  };

  // Navigation links based on auth state
  const publicLinks = [
    { href: "/#about", label: "About", icon: "info" },
    { href: "/#contact", label: "Contact", icon: "mail" },
    { href: "/pricing", label: "Premium", icon: "star" },
  ];

  const authLinks = [
    { href: "/dashboard", label: "Dashboard", icon: "grid" },
    { href: "/#about", label: "About", icon: "info" },
    { href: "/#contact", label: "Contact", icon: "mail" },
    { href: "/pricing", label: "Premium", icon: "star" },
  ];

  const navLinks = session ? authLinks : publicLinks;

  // Handle smooth scroll for hash links
  const handleNavClick = (e, href) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      
      if (pathname !== "/") {
        // If not on home page, navigate first
        window.location.href = href;
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
      setMobileMenuOpen(false);
    }
  };

  // Icon component
  const NavIcon = ({ name, className }) => {
    const icons = {
      grid: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />,
      info: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
      mail: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
      star: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />,
    };
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {icons[name]}
      </svg>
    );
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "py-2" : "py-4"
    }`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className={`bg-white/95 backdrop-blur-md rounded-2xl shadow-lg shadow-black/5 px-4 sm:px-6 py-3 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}>
          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center gap-2">
            <Image
              src="/img/logo.png"
              alt="Taptree"
              width={120}
              height={120}
              className="h-11 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg  transition-all duration-200 ${
                    isActive(link.href)
                      ? "text-emerald-700 bg-emerald-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {status === "loading" ? (
              <div className="w-20 h-10 bg-gray-100 rounded-full animate-pulse" />
            ) : session ? (
              <div className="flex items-center gap-3">
                {/* User info pill */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-xs font-semibold text-emerald-700">
                      {session.user.name?.charAt(0).toUpperCase() || session.user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-25 truncate">
                    {session.user.name || session.user.email}
                  </span>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`px-4 py-2 bg-gray-100 text-sm font-medium rounded-lg transition-colors ${
                    pathname === "/login" 
                      ? "text-emerald-700 bg-emerald-50" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition-colors shadow-sm hover:shadow"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 -mr-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-125 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}>
          <div className="bg-white rounded-2xl shadow-lg shadow-black/5 p-4">
            {/* User info for logged in users */}
            {session && (
              <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-lg font-semibold text-emerald-700">
                    {session.user.name?.charAt(0).toUpperCase() || session.user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {session.user.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {session.user.email}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-emerald-700 bg-emerald-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <NavIcon name={link.icon} className="w-5 h-5" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Auth Buttons */}
            <div className="flex flex-col gap-2 pt-4 mt-4 border-t border-gray-100">
              {session ? (
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full px-4 py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  Sign out
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={`w-full px-4 py-3 text-center text-sm font-medium rounded-xl transition-colors ${
                      pathname === "/login"
                        ? "text-emerald-700 bg-emerald-50"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="w-full px-4 py-3 text-center text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors"
                  >
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
