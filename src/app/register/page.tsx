"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUp } from "@/lib/auth-client";

const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", photoURL: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!PASSWORD_RULE.test(form.password)) {
      toast.error(
        "Password must be at least 6 characters and include an uppercase and a lowercase letter."
      );
      return;
    }

    setSubmitting(true);

    const { error } = await signUp.email({
      email: form.email,
      password: form.password,
      name: form.name,
      image: form.photoURL || undefined,
    });

    setSubmitting(false);

    if (error) {
      toast.error(error.message || "Registration failed. Please try again.");
      return;
    }

    toast.success("Account created successfully!");
    router.push("/");
  };

  return (
    <div className="min-h-[80vh] grid place-items-center px-4 py-16">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h1 className="text-2xl font-heading font-bold text-center">Create your account</h1>
          <p className="text-center text-base-content/60 text-sm mt-1">
            Join the community and start organizing.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                required
                value={form.name}
                onChange={onChange}
                className="input input-bordered w-full"
                placeholder="Jane Doe"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={onChange}
                className="input input-bordered w-full"
                placeholder="you@example.com"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                name="photoURL"
                value={form.photoURL}
                onChange={onChange}
                className="input input-bordered w-full"
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={onChange}
                className="input input-bordered w-full"
                placeholder="••••••••"
              />
              <label className="label">
                <span className="label-text-alt text-base-content/60">
                  Min 6 characters, one uppercase & one lowercase letter.
                </span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={submitting}>
              {submitting ? <span className="loading loading-spinner loading-sm" /> : "Register"}
            </button>
          </form>

          <p className="text-center text-sm mt-4 text-base-content/70">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
