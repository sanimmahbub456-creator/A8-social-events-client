"use client";

import { FiBell, FiSend } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Newsletter() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thanks for subscribing!");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section className="max-w-5xl mx-auto px-4 md:px-10 py-16 md:py-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 border border-base-300 px-6 md:px-14 py-12 text-center">
        <div className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-10 h-56 w-56 rounded-full bg-secondary/15 blur-3xl" />

        <span className="relative inline-grid place-items-center h-12 w-12 rounded-2xl bg-primary text-primary-content mb-5">
          <FiBell size={20} />
        </span>

        <h2 className="relative text-2xl md:text-3xl font-heading font-bold">
          Never miss a drive near you
        </h2>
        <p className="relative mt-2 text-sm text-base-content/60">
          One short note a month. No spam, unsubscribe anytime.
        </p>

        <form
          onSubmit={handleSubmit}
          className="relative mt-7 flex flex-col sm:flex-row gap-2 max-w-sm mx-auto"
        >
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="input input-bordered rounded-full flex-1"
          />
          <button type="submit" className="btn btn-primary rounded-full gap-2">
            Subscribe <FiSend size={14} />
          </button>
        </form>
      </div>
    </section>
  );
}