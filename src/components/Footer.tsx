import Link from "next/link";
import { FaFacebook, FaInstagram, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { FiArrowUpRight, FiHeart } from "react-icons/fi";
import { EVENT_TYPES } from "@/types/event";

const CAUSE_DOT_CLASS: Record<string, string> = {
  Cleanup: "bg-info",
  Plantation: "bg-success",
  Donation: "bg-error",
  "Blood Drive": "bg-error",
  "Awareness Campaign": "bg-warning",
  Other: "bg-neutral-content",
};

const LINKS = [
  { href: "/events", label: "Upcoming Events" },
  { href: "/create-event", label: "Create Event" },
  { href: "/manage-events", label: "Manage Events" },
  { href: "/joined-events", label: "Joined Events" },
];

const SOCIALS = [FaFacebook, FaInstagram, FaXTwitter, FaLinkedin];

export default function Footer() {
  return (
    <footer className="relative bg-neutral text-neutral-content overflow-hidden">
      {/* Subtle glow for depth, nothing loud */}
      <div className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      {/* Big, bold CTA strip — the whole footer's reason to exist */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-10 pt-16 pb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/10">
        <h2 className="text-3xl md:text-5xl font-heading font-bold leading-tight max-w-xl">
          Your neighborhood needs <span className="text-primary">you</span>.
        </h2>
        <Link
          href="/create-event"
          className="btn btn-primary btn-lg gap-2 self-start md:self-auto shrink-0"
        >
          Start a Drive <FiArrowUpRight />
        </Link>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-10 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="h-10 w-10 rounded-full bg-primary text-primary-content grid place-items-center text-sm font-bold">
            HT
          </span>
          <span>
            <span className="block text-lg font-heading font-bold text-white leading-none">
              HandsTogether
            </span>
            <span className="text-[11px] text-neutral-content/50">Small acts, big change</span>
          </span>
        </Link>

        {/* Lean nav */}
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-content/60">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-primary transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Causes as compact chips, not sentences */}
        <div className="flex flex-wrap gap-2">
          {EVENT_TYPES.map((type) => (
            <span
              key={type}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs text-neutral-content/60"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${CAUSE_DOT_CLASS[type]}`} />
              {type}
            </span>
          ))}
        </div>

        {/* Socials */}
        <div className="flex gap-3 shrink-0">
          {SOCIALS.map((Icon, i) => (
            <a
              key={i}
              href="#"
              aria-label="social link"
              className="btn btn-circle btn-sm bg-white/5 border-none hover:bg-primary"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>

      <div className="relative border-t border-white/10 py-5 text-center text-xs text-neutral-content/40 flex items-center justify-center gap-1">
        © {new Date().getFullYear()} HandsTogether. All right reserved.
      </div>
    </footer>
  );
}