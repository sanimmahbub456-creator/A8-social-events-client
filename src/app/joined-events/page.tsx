"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { FiMapPin, FiCalendar, FiCheckCircle, FiArrowRight } from "react-icons/fi";
import PrivateRoute from "@/components/PrivateRoute";
import Loading from "@/components/Loading";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useAuth } from "@/hooks/useAuth";
import { JoinedEventItem } from "@/types/event";

// Same type-color mapping used on the event cards elsewhere, kept consistent across the app.
const TYPE_BADGE_CLASS: Record<string, string> = {
  Cleanup: "badge-info",
  Plantation: "badge-success",
  Donation: "badge-error",
  "Blood Drive": "badge-error",
  "Awareness Campaign": "badge-warning",
  Other: "badge-neutral",
};

function JoinedEventsList() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [joined, setJoined] = useState<JoinedEventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    axiosSecure
      .get(`/joined-events?email=${encodeURIComponent(user.email)}`)
      .then((res) => setJoined(res.data))
      .finally(() => setLoading(false));
  }, [user?.email]);

  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-10 py-14">
      <span className="badge badge-ghost gap-1 mb-3">
        <FiCheckCircle size={12} /> My Volunteer Commitments
      </span>
      <h1 className="text-3xl font-heading font-bold">Joined Events</h1>
      <p className="text-base-content/60 mt-1 max-w-2xl">
        Here are all the social development and community service drives you have signed up for,
        sorted by event date.
      </p>
      <div className="divider mt-6 mb-10" />

      {joined.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-base-300 rounded-2xl">
          <p className="text-base-content/60">You haven&apos;t joined any events yet.</p>
          <Link href="/events" className="btn btn-primary btn-sm mt-4">
            Browse upcoming events
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {joined.map((item) => {
            const badgeClass = TYPE_BADGE_CLASS[item.eventType] || "badge-primary";
            return (
              <div
                key={item._id}
                className="card bg-base-100 border border-base-300 shadow-sm rounded-2xl overflow-hidden"
              >
                <figure className="relative h-44 w-full">
                  <Image src={item.thumbnail} alt={item.eventTitle} fill className="object-cover" />
                  <span
                    className={`badge ${badgeClass} border-none gap-1 absolute top-3 left-3 shadow`}
                  >
                    {item.eventType}
                  </span>
                  <span className="badge bg-neutral/80 text-neutral-content border-none gap-1 absolute bottom-3 left-3 shadow">
                    <FiCalendar size={11} /> {format(new Date(item.eventDate), "EEE, MMM d, yyyy")}
                  </span>
                </figure>

                <div className="card-body gap-2">
                  <h3 className="card-title text-lg font-heading line-clamp-1">{item.eventTitle}</h3>
                  <div className="flex items-center gap-2 text-sm text-base-content/70">
                    <FiMapPin className="shrink-0" /> <span className="line-clamp-1">{item.location}</span>
                  </div>
                  <p className="text-sm text-base-content/60">
                    You have signed up as a confirmed volunteer for this initiative.
                  </p>

                  <div className="divider my-1" />

                  <p className="text-xs font-medium text-success">
                    Joined {format(new Date(item.joinedAt), "EEE, MMM d, yyyy")}
                  </p>

                  <div className="card-actions mt-2">
                    <Link href={`/events/${item.eventId}`} className="btn btn-primary btn-sm w-full gap-1">
                      View Event <FiArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function JoinedEventsPage() {
  return (
    <PrivateRoute>
      <JoinedEventsList />
    </PrivateRoute>
  );
}