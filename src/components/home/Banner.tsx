import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiPlusCircle, FiUsers } from "react-icons/fi";

const STATS: { value: string; label: string; colorClass: string }[] = [
  { value: "2,430+", label: "Active Volunteers", colorClass: "text-primary" },
  { value: "250+", label: "Events Completed", colorClass: "text-success" },
  { value: "30,000+", label: "Lives Impacted", colorClass: "text-secondary" },
  { value: "100%", label: "Community Driven", colorClass: "text-warning" },
];

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10">
      {/* Soft animated gradient blobs for a bit of depth/motion */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-secondary/20 blur-3xl animate-pulse [animation-delay:1s]" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-10 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="badge badge-primary badge-outline mb-4">
            Community-powered social service
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
            Small acts, organized together, change whole neighborhoods.
          </h1>
          <p className="mt-5 text-base-content/70 text-lg max-w-xl">
            Find a cleanup, a clothes drive, or a plantation day near you — or start your own.
            HandsTogether connects neighbors who want to help with the events that need them.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/events"
              className="btn btn-primary btn-lg gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Explore Upcoming Events <FiArrowRight />
            </Link>
            <Link
              href="/create-event"
              className="btn btn-outline btn-lg gap-2 hover:-translate-y-0.5 transition-all"
            >
              <FiPlusCircle /> Create an Event
            </Link>
          </div>
        </div>

        <div className="relative h-72 md:h-[420px] rounded-3xl overflow-hidden shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80"
            alt="Volunteers organizing a community donation drive"
            fill
            className="object-cover"
            priority
          />
          {/* Floating live-activity chip for a bit of modern flair */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-base-100/95 backdrop-blur rounded-full pl-2 pr-4 py-2 shadow-lg">
            <span className="h-8 w-8 rounded-full bg-primary/10 text-primary grid place-items-center">
              <FiUsers size={16} />
            </span>
            <span className="text-xs font-medium">
              Volunteers are joining drives right now
            </span>
          </div>
        </div>
      </div>

      {/* Impact stats strip */}
      <div className="relative max-w-5xl mx-auto px-4 md:px-10 pb-16 md:pb-24">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-base-100 border border-base-300 rounded-xl shadow-sm py-5 px-3 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <p className={`text-2xl md:text-3xl font-heading font-bold ${stat.colorClass}`}>
                {stat.value}
              </p>
              <p className="text-xs text-base-content/60 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}