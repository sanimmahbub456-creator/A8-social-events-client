"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiArrowLeft, FiShield } from "react-icons/fi";
import PrivateRoute from "@/components/PrivateRoute";
import EventForm, { EventFormValues } from "@/components/EventForm";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useAuth } from "@/hooks/useAuth";

function CreateEventForm() {
  const router = useRouter();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (values: EventFormValues) => {
    try {
      await axiosSecure.post("/events", {
        ...values,
        creatorEmail: user?.email,
        creatorName: user?.name,
      });
      toast.success("Event created successfully!");
      router.push("/events");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-10 py-14">
      <Link
        href="/events"
        className="inline-flex items-center gap-1 text-sm text-base-content/60 hover:text-primary mb-6"
      >
        <FiArrowLeft /> Back to Upcoming Events
      </Link>

      <span className="badge badge-ghost gap-1 mb-3">
        <FiShield size={12} /> Social Service Drive
      </span>
      <h1 className="text-3xl font-heading font-bold">Create a Community Event</h1>
      <p className="text-base-content/60 mt-1 mb-8">
        Organize a local relief effort, environmental cleanup, or community support drive.
      </p>

      <div className="card bg-base-100 border border-base-300 shadow-sm rounded-2xl">
        <div className="card-body">
          <EventForm submitLabel="Publish Event" onSubmit={handleSubmit} creatorEmail={user?.email} />
        </div>
      </div>
    </div>
  );
}

export default function CreateEventPage() {
  return (
    <PrivateRoute>
      <CreateEventForm />
    </PrivateRoute>
  );
}