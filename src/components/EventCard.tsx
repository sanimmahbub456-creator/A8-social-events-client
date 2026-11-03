import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { FiMapPin, FiCalendar, FiUser, FiArrowRight } from "react-icons/fi";
import { EventItem } from "@/types/event";

// Consistent color per event type, with a safe fallback for any custom type.
const TYPE_BADGE_CLASS: Record<string, string> = {
  Cleanup: "badge-info",
  Plantation: "badge-success",
  Donation: "badge-error",
  "Blood Drive": "badge-error",
  "Awareness Campaign": "badge-warning",
  Other: "badge-neutral",
};

export default function EventCard({ event }: { event: EventItem }) {
  const badgeClass = TYPE_BADGE_CLASS[event.eventType] || "badge-primary";

  return (
    <div className="card bg-base-100 shadow-sm border border-base-300 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <figure className="relative h-48 w-full">
        <Image src={event.thumbnail} alt={event.title} fill className="object-cover" />
        {/* No forced text color here — each badge-* class ships its own matching
            *-content text color in the theme, so this stays readable in both themes. */}
        <span className={`badge ${badgeClass} border-none gap-1 absolute top-3 left-3 shadow`}>
          {event.eventType}
        </span>
        <span className="badge bg-neutral/80 text-neutral-content border-none gap-1 absolute bottom-3 left-3 shadow">
          <FiCalendar size={11} /> {format(new Date(event.eventDate), "EEE, MMM d, yyyy")}
        </span>
      </figure>

      <div className="card-body gap-2">
        <h3 className="card-title font-heading text-lg leading-snug text-primary line-clamp-1">
          {event.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-base-content/70">
          <FiMapPin className="shrink-0" /> <span className="line-clamp-1">{event.location}</span>
        </div>
        <p className="text-sm text-base-content/60 line-clamp-2">{event.description}</p>

        <div className="divider my-1" />

        <div className="flex items-center gap-2 text-xs text-base-content/50">
          <FiUser className="shrink-0" /> {event.creatorName || event.creatorEmail}
        </div>

        <div className="card-actions mt-2">
          <Link href={`/events/${event._id}`} className="btn btn-primary btn-sm w-full gap-1">
            View Event <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}