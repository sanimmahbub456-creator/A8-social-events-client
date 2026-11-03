"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiCalendar, FiPlusCircle, FiSearch } from "react-icons/fi";
import { axiosPublic } from "@/lib/axiosSecure";
import { EventItem, EVENT_TYPES } from "@/types/event";
import EventCard from "@/components/EventCard";
import { CardSkeleton } from "@/components/Loading";

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [eventType, setEventType] = useState("all");

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (eventType !== "all") params.set("eventType", eventType);

    const timeout = setTimeout(() => {
      axiosPublic
        .get(`/events?${params.toString()}`)
        .then((res) => setEvents(res.data))
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, eventType]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-14">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <span className="badge badge-ghost gap-1 mb-3">
            <FiCalendar size={12} /> Future Community Drives
          </span>
          <h1 className="text-3xl font-heading font-bold">Upcoming Events</h1>
          <p className="text-base-content/60 mt-1 max-w-xl">
            Discover verified volunteer initiatives scheduled for upcoming dates. Past events are
            automatically excluded so you can focus on active drives that need support.
          </p>
        </div>
        <Link href="/create-event" className="btn btn-primary gap-2 shrink-0">
          <FiPlusCircle /> Create Event
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setEventType("all")}
            className={`btn btn-sm rounded-full ${eventType === "all" ? "btn-primary" : "btn-outline"}`}
          >
            All
          </button>
          {EVENT_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setEventType(type)}
              className={`btn btn-sm rounded-full ${eventType === type ? "btn-primary" : "btn-outline"}`}
            >
              {type}
            </button>
          ))}
        </div>

        <label className="input input-bordered flex items-center gap-2 w-full lg:w-72 shrink-0">
          <FiSearch className="text-base-content/40" />
          <input
            type="text"
            placeholder="Search events or areas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="grow"
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
          : events.map((event) => <EventCard key={event._id} event={event} />)}
      </div>

      {!loading && events.length === 0 && (
        <p className="text-center text-base-content/60 mt-16">
          No upcoming events match your search.
        </p>
      )}
    </div>
  );
}