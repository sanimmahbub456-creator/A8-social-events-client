"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2, FiPlusCircle, FiSettings, FiCalendar, FiMapPin, FiMail } from "react-icons/fi";
import PrivateRoute from "@/components/PrivateRoute";
import EventForm, { EventFormValues } from "@/components/EventForm";
import Loading from "@/components/Loading";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useAuth } from "@/hooks/useAuth";
import { EventItem } from "@/types/event";

function ManageEventsList() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadEvents = () => {
    if (!user?.email) return;
    setLoading(true);
    axiosSecure
      .get(`/events/manage?email=${encodeURIComponent(user.email)}`)
      .then((res) => setEvents(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(loadEvents, [user?.email]);

  const handleUpdate = async (values: EventFormValues) => {
    if (!editing) return;
    try {
      await axiosSecure.patch(`/events/${editing._id}`, values);
      toast.success("Event updated successfully!");
      setEditing(null);
      loadEvents();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update event");
    }
  };

  const confirmDelete = async (id: string) => {
    try {
      await axiosSecure.delete(`/events/${id}`);
      toast.success("Event deleted");
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to delete event");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-10 py-14">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <span className="badge badge-ghost gap-1 mb-3">
            <FiSettings size={12} /> Organizer Dashboard
          </span>
          <h1 className="text-3xl font-heading font-bold">Manage My Events</h1>
          <p className="text-base-content/60 mt-1 max-w-xl">
            View, edit, and manage the social drives you have published. Only you have permission
            to edit or delete your created initiatives.
          </p>
        </div>
        <Link href="/create-event" className="btn btn-primary gap-2 shrink-0">
          <FiPlusCircle /> Create New Event
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-base-300 rounded-2xl">
          <p className="text-base-content/60">You haven&apos;t created any events yet.</p>
          <Link href="/create-event" className="btn btn-primary btn-sm mt-4 gap-2">
            <FiPlusCircle /> Create your first event
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="card bg-base-100 border border-base-300 shadow-sm rounded-2xl overflow-hidden"
            >
              <figure className="relative h-44 w-full">
                <Image src={event.thumbnail} alt={event.title} fill className="object-cover" />
                <span className="badge badge-success text-success-content gap-1 absolute top-3 left-3 shadow">
                  {event.eventType}
                </span>
                <span className="badge badge-neutral gap-1 absolute bottom-3 left-3 bg-neutral/80 border-none shadow">
                  <FiCalendar size={11} /> {format(new Date(event.eventDate), "EEE, MMM d, yyyy")}
                </span>
              </figure>

              <div className="card-body gap-2">
                <h3 className="card-title text-lg font-heading line-clamp-1">{event.title}</h3>
                <div className="flex items-center gap-2 text-sm text-base-content/70">
                  <FiMapPin className="shrink-0" /> <span className="line-clamp-1">{event.location}</span>
                </div>
                <p className="text-sm text-base-content/60 line-clamp-2">{event.description}</p>

                <div className="divider my-1" />

                <div className="flex items-center gap-2 text-xs text-base-content/50">
                  <FiMail className="shrink-0" /> <span className="truncate">{event.creatorEmail}</span>
                </div>

                <div className="card-actions mt-2 flex-nowrap gap-2">
                  <Link href={`/events/${event._id}`} className="btn btn-sm btn-outline flex-1">
                    View
                  </Link>
                  <button
                    onClick={() => setEditing(event)}
                    className="btn btn-sm btn-outline btn-info gap-1"
                    aria-label="Edit event"
                  >
                    <FiEdit2 size={14} /> Edit
                  </button>
                  <button
                    onClick={() => setDeletingId(event._id)}
                    className="btn btn-sm btn-outline btn-error gap-1"
                    aria-label="Delete event"
                  >
                    <FiTrash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <dialog open className="modal modal-open">
          <div className="modal-box max-w-xl">
            <h3 className="font-heading font-bold text-lg mb-4">Update Event</h3>
            <EventForm initialValues={editing} submitLabel="Save Changes" onSubmit={handleUpdate} />
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setEditing(null)}>
                Cancel
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setEditing(null)}>close</button>
          </form>
        </dialog>
      )}

      {deletingId && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-heading font-bold text-lg">Delete this event?</h3>
            <p className="py-4 text-base-content/70">
              This action can&apos;t be undone. The event and its join records will be removed.
            </p>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setDeletingId(null)}>
                Cancel
              </button>
              <button className="btn btn-error" onClick={() => confirmDelete(deletingId)}>
                Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default function ManageEventsPage() {
  return (
    <PrivateRoute>
      <ManageEventsList />
    </PrivateRoute>
  );
}