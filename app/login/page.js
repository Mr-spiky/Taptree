"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ErrorAlert from "@/components/ErrorAlert";
import TaptreeLogo from "@/components/TaptreeLogo";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Map NextAuth error strings to our typed error codes
function mapAuthError(errorStr) {
  if (!errorStr) return { code: "NETWORK_ERROR", context: {} };
  const lower = errorStr.toLowerCase();
  if (lower.includes("no account") || lower.includes("no user"))
    return { code: "NO_ACCOUNT", context: {} };
  if (lower.includes("invalid password") || lower.includes("password"))
    return { code: "WRONG_PASSWORD", context: {} };
  if (lower.includes("configuration"))
    return { code: "NETWORK_ERROR", context: {} };
  return { code: "NETWORK_ERROR", context: {} };
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState(null); // { code, context, message }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorInfo(null);
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.toLowerCase(),
        password,
        redirect: false,
      });

      if (result?.error) {
        const mapped = mapAuthError(result.error);
        setErrorInfo({ ...mapped, message: result.error });
        toast.error(result.error);
      } else {
        toast.success("Logged in successfully!");
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 1000);
      }
    } catch (err) {
      setErrorInfo({ code: "NETWORK_ERROR", context: {}, message: err.message });
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
          {/* Yellow strip */}
          <div className="strip-yellow h-2 rounded-t-[9px] -mx-8 -mt-8 mb-8" style={{ marginLeft: "-2rem", marginRight: "-2rem", marginTop: "-2rem", borderTopLeftRadius: "9px", borderTopRightRadius: "9px" }} />

          <div className="text-center mb-8">
            <div className="mx-auto mb-5">
              <TaptreeLogo size={56} />
            </div>
            <h1 className="text-3xl font-black text-brutal-black">Welcome back</h1>
            <p className="text-brutal-gray mt-2 font-medium">Sign in to your Taptree</p>
          </div>

          {errorInfo && (
            <ErrorAlert
              errorCode={errorInfo.code}
              message={errorInfo.message}
              context={{ email, ...errorInfo.context }}
              onDismiss={() => setErrorInfo(null)}
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="label-upper block mb-2">Email</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="brutal-input" placeholder="you@example.com" required disabled={isLoading} />
            </div>
            <div>
              <label htmlFor="password" className="label-upper block mb-2">Password</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="brutal-input" placeholder="••••••••" required disabled={isLoading} />
            </div>
            <button type="submit" disabled={isLoading} className="brutal-btn brutal-btn-yellow w-full py-3.5 text-sm">
              {isLoading ? "Signing in..." : "Sign in →"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-brutal-gray text-sm font-medium">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-brutal-black font-bold hover:underline">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

