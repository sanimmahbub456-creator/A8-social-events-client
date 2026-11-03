"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/lib/auth-client";
import Loading from "@/components/Loading";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await signIn.email({ email, password });

    setSubmitting(false);

    if (error) {
      toast.error(error.message || "Invalid email or password");
      return;
    }

    toast.success("Logged in successfully!");
    router.push(redirectTo);
  };

  const handleGoogleLogin = async () => {
    await signIn.social({ provider: "google", callbackURL: redirectTo });
  };

  return (
    <div className="min-h-[80vh] grid place-items-center px-4 py-16">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h1 className="text-2xl font-heading font-bold text-center">Welcome back</h1>
          <p className="text-center text-base-content/60 text-sm mt-1">
            Log in to create, join, and manage events.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full"
                placeholder="you@example.com"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={submitting}>
              {submitting ? <span className="loading loading-spinner loading-sm" /> : "Login"}
            </button>
          </form>

          <div className="divider">OR</div>

          <button onClick={handleGoogleLogin} className="btn btn-outline w-full gap-2">
            <FcGoogle size={20} /> Continue with Google
          </button>

          <p className="text-center text-sm mt-6 text-base-content/70">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="link link-primary font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<Loading />}>
      <LoginForm />
    </Suspense>
  );
}
