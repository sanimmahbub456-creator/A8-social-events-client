"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { axiosPublic } from "@/lib/axiosSecure";
import { EventItem } from "@/types/event";
import EventCard from "../EventCard";
import { CardSkeleton } from "../Loading";

export default function RecentEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic
      .get("/events/upcoming?limit=6")
      .then((res) => setEvents(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-base-100/60 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <h2 className="section-heading">Recent Upcoming Events</h2>
        <p className="section-subheading">
          The soonest events on the calendar across the community right now.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
            : events.map((event) => <EventCard key={event._id} event={event} />)}
        </div>

        {!loading && events.length === 0 && (
          <p className="text-center text-base-content/60 mt-10">
            No upcoming events yet — be the first to create one.
          </p>
        )}

        <div className="text-center mt-10">
          <Link href="/events" className="btn btn-outline btn-primary">
            See all upcoming events
          </Link>
        </div>
      </div>
    </section>
  );
}
