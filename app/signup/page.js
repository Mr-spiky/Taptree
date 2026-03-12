"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TaptreeLogo from "@/components/TaptreeLogo";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const filledFields = [name, email, password, confirmPassword].filter(v => v.length > 0).length;
  const progressPercent = Math.round((filledFields / 4) * 100);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      setError("Password must contain at least one letter and one number");
      toast.error("Password must contain at least one letter and one number");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (!data.success) {
        setError(data.message);
        toast.error(data.message);
        setIsLoading(false);
        return;
      }

      toast.success("Account created! Signing you in...");
      const signInResult = await signIn("credentials", {
        email: email.toLowerCase(),
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        toast.info("Please sign in with your new account");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setTimeout(() => { router.push("/dashboard"); router.refresh(); }, 1000);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full max-w-md animate-fade-in-up">
        <div className="brutal-card-static p-8">
          <div className="strip-blue h-2 rounded-t-[9px] -mx-8 -mt-8 mb-8" style={{ marginLeft: "-2rem", marginRight: "-2rem", marginTop: "-2rem", borderTopLeftRadius: "9px", borderTopRightRadius: "9px" }} />

          <div className="text-center mb-6">
            <div className="mx-auto mb-5">
              <TaptreeLogo size={56} />
            </div>
            <h1 className="text-3xl font-black text-brutal-black">Create account</h1>
            <p className="text-brutal-gray mt-2 font-medium">Start building your Taptree</p>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="label-upper">Progress</span>
              <span className="text-sm font-black text-brutal-black">{progressPercent}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-brutal-red/10 border-2 border-brutal-red rounded-lg text-brutal-red text-sm font-bold flex items-start gap-3 animate-fade-in">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="label-upper block mb-2">Name</label>
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="brutal-input" placeholder="Your name" required disabled={isLoading} />
            </div>
            <div>
              <label htmlFor="email" className="label-upper block mb-2">Email</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="brutal-input" placeholder="you@example.com" required disabled={isLoading} />
            </div>
            <div>
              <label htmlFor="password" className="label-upper block mb-2">Password</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="brutal-input" placeholder="••••••••" required disabled={isLoading} minLength={6} />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="label-upper block mb-2">Confirm Password</label>
              <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="brutal-input" placeholder="••••••••" required disabled={isLoading} minLength={6} />
            </div>
            <button type="submit" disabled={isLoading} className="brutal-btn brutal-btn-blue w-full py-3.5 text-sm">
              {isLoading ? "Creating..." : "Create account →"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-brutal-gray text-sm font-medium">
              Already have an account?{" "}
              <Link href="/login" className="text-brutal-black font-bold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
