"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import toast from "react-hot-toast";
import {
  FiArrowLeft,
  FiMapPin,
  FiCalendar,
  FiTag,
  FiMail,
  FiUsers,
  FiShare2,
  FiHeart,
  FiCheckCircle,
} from "react-icons/fi";
import { axiosPublic } from "@/lib/axiosSecure";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useAuth } from "@/hooks/useAuth";
import { EventItem } from "@/types/event";
import Loading from "@/components/Loading";

const GUIDELINES = [
  "Please arrive 15 minutes before the scheduled time at the designated location.",
  "Wear comfortable clothing suitable for physical social work and distribution.",
  "Bring any pre-coordinated relief packages or distribution items if requested.",
];

export default function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  const loadEvent = () => {
    axiosPublic
      .get(`/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch(() => toast.error("Event not found"))
      .finally(() => setLoading(false));
  };

  useEffect(loadEvent, [id]);

  const handleJoin = async () => {
    if (!user) {
      toast.error("Please login to join this event");
      router.push(`/login?redirect=/events/${id}`);
      return;
    }

    setJoining(true);
    try {
      await axiosSecure.post(`/events/${id}/join`, { userName: user.name });
      toast.success("You've joined this event!");
      loadEvent(); // refresh so the volunteer count reflects reality
    } catch (err: any) {
      const message = err?.response?.data?.message || "Could not join this event";
      toast.error(message);
    } finally {
      setJoining(false);
    }
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Could not copy link");
    }
  };

  if (loading) return <Loading />;
  if (!event) {
    return <p className="text-center py-20 text-base-content/60">Event not found.</p>;
  }

  const organizerInitials = (event.creatorName || event.creatorEmail || "?")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-10 py-10">
      <Link
        href="/events"
        className="inline-flex items-center gap-1 text-sm text-base-content/60 hover:text-primary mb-4"
      >
        <FiArrowLeft /> Back to Upcoming Events
      </Link>

      {/* Hero image with overlaid title, type badge, location + date */}
      <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden shadow">
        <Image src={event.thumbnail} alt={event.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <span className="badge bg-white/90 text-neutral border-none gap-1 absolute top-4 left-4 shadow">
          <FiTag size={12} /> {event.eventType}
        </span>

        <div className="absolute bottom-5 left-5 right-5 text-white">
          <h1 className="text-2xl md:text-4xl font-heading font-bold drop-shadow">{event.title}</h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-2 text-sm text-white/90">
            <span className="flex items-center gap-1">
              <FiMapPin /> {event.location}
            </span>
            <span className="flex items-center gap-1">
              <FiCalendar /> {format(new Date(event.eventDate), "EEE, MMM d, yyyy")}
            </span>
          </div>
        </div>
      </div>

      {/* Volunteer count + share + join action strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-base-100 border border-base-300 rounded-2xl mt-6 p-5">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-primary/10 text-primary grid place-items-center">
            <FiUsers size={20} />
          </div>
          <div>
            <p className="font-semibold">{event.joinedCount ?? 0} Volunteers Joined</p>
            <p className="text-xs text-base-content/50">Sign up to join hands for this drive</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleShare} className="btn btn-circle btn-outline" aria-label="Share event">
            <FiShare2 />
          </button>
          <button onClick={handleJoin} className="btn btn-primary gap-2" disabled={joining}>
            {joining ? <span className="loading loading-spinner loading-sm" /> : <FiHeart />}
            Join Event
          </button>
        </div>
      </div>

      {/* About + guidelines (left), organizer card (right) */}
      <div className="grid md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2 space-y-8">
          <div>
            <h2 className="text-lg font-heading font-bold">About this Social Initiative</h2>
            <p className="mt-2 text-base-content/70 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-heading font-bold">Volunteer Guidelines</h2>
            <ul className="mt-3 space-y-2">
              {GUIDELINES.map((line) => (
                <li key={line} className="flex items-start gap-2 text-sm text-base-content/70">
                  <FiCheckCircle className="text-success mt-0.5 shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-300 shadow-sm h-fit">
          <div className="card-body gap-3">
            <p className="text-xs font-semibold tracking-wide text-base-content/50 uppercase">
              Initiative Organizer
            </p>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary grid place-items-center font-bold shrink-0">
                {organizerInitials}
              </div>
              <div className="min-w-0">
                <p className="font-semibold truncate">{event.creatorName || "Organizer"}</p>
                <p className="flex items-center gap-1 text-xs text-base-content/60 truncate">
                  <FiMail className="shrink-0" /> {event.creatorEmail}
                </p>
              </div>
            </div>
            <div className="divider my-1" />
            <span className="flex items-center gap-1 text-xs text-success">
              <FiCheckCircle /> Verified Platform Member
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}