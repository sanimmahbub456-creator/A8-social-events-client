"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FiType, FiTag, FiCalendar, FiMapPin, FiImage, FiAlignLeft, FiSend } from "react-icons/fi";
import { EVENT_TYPES, EventItem } from "@/types/event";

export interface EventFormValues {
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
}

interface Props {
  initialValues?: Partial<EventItem>;
  submitLabel: string;
  onSubmit: (values: EventFormValues) => Promise<void>;
  /** Shown as a read-only "Organizer Email attached" strip when provided (create flow only). */
  creatorEmail?: string;
}

const emptyValues: EventFormValues = {
  title: "",
  description: "",
  eventType: "",
  thumbnail: "",
  location: "",
  eventDate: "",
};

// Quick-pick thumbnails so the examiner/tester doesn't have to go hunting for an image URL.
const PHOTO_PRESETS: { label: string; url: string }[] = [
  {
    label: "Winter Clothes",
    url: "https://images.unsplash.com/photo-1601924638867-3ec6e3e1b9f7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Blanket Relief",
    url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Cleanup",
    url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Tree Plantation",
    url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function EventForm({ initialValues, submitLabel, onSubmit, creatorEmail }: Props) {
  const [values, setValues] = useState<EventFormValues>({
    ...emptyValues,
    ...initialValues,
    eventDate: initialValues?.eventDate?.slice(0, 10) || "",
  });
  const [submitting, setSubmitting] = useState(false);

  const todayISO = new Date().toISOString().slice(0, 10);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!values.title.trim() || !values.description.trim() || !values.eventType) {
      toast.error("Please fill in all required fields");
      return false;
    }
    if (!values.thumbnail.trim() || !values.location.trim()) {
      toast.error("Please fill in all required fields");
      return false;
    }
    if (!values.eventDate) {
      toast.error("Please choose an event date");
      return false;
    }
    if (values.eventDate < todayISO) {
      toast.error("Event date cannot be in the past");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="form-control">
        <label className="label py-1">
          <span className="label-text font-medium">Event Title *</span>
        </label>
        <div className="relative">
          <FiType className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
          <input
            name="title"
            required
            value={values.title}
            onChange={onChange}
            className="input input-bordered w-full pl-10 rounded-xl"
            placeholder="e.g. Winter Clothes Distribution – Mirpur 10, Dhaka"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="form-control">
          <label className="label py-1">
            <span className="label-text font-medium">Event Type *</span>
          </label>
          <div className="relative">
            <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 z-10" />
            <select
              name="eventType"
              required
              value={values.eventType}
              onChange={onChange}
              className="select select-bordered w-full pl-10 rounded-xl"
            >
              <option value="" disabled>
                Select a type
              </option>
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-control">
          <label className="label py-1">
            <span className="label-text font-medium">Event Date *</span>
          </label>
          <div className="relative">
            <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 z-10" />
            <input
              type="date"
              name="eventDate"
              required
              min={todayISO}
              value={values.eventDate}
              onChange={onChange}
              className="input input-bordered w-full pl-10 rounded-xl"
            />
          </div>
          <label className="label py-1">
            <span className="label-text-alt text-base-content/50">Dates must be in the future (today or later)</span>
          </label>
        </div>
      </div>

      <div className="form-control">
        <label className="label py-1">
          <span className="label-text font-medium">Location / Venue *</span>
        </label>
        <div className="relative">
          <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
          <input
            name="location"
            required
            value={values.location}
            onChange={onChange}
            className="input input-bordered w-full pl-10 rounded-xl"
            placeholder="e.g. Mohammadpur Town Hall, Dhaka"
          />
        </div>
      </div>

      <div className="form-control">
        <label className="label py-1">
          <span className="label-text font-medium">Thumbnail Image URL *</span>
        </label>
        <div className="relative">
          <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
          <input
            name="thumbnail"
            required
            value={values.thumbnail}
            onChange={onChange}
            className="input input-bordered w-full pl-10 rounded-xl"
            placeholder="https://images.unsplash.com/photo-..."
          />
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-xs">
          <span className="text-base-content/50">Quick photo presets:</span>
          {PHOTO_PRESETS.map((preset, i) => (
            <span key={preset.label} className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setValues((prev) => ({ ...prev, thumbnail: preset.url }))}
                className="link link-primary no-underline hover:underline"
              >
                {preset.label}
              </button>
              {i < PHOTO_PRESETS.length - 1 && <span className="text-base-content/30">•</span>}
            </span>
          ))}
        </div>
      </div>

      <div className="form-control">
        <label className="label py-1">
          <span className="label-text font-medium">Event Description *</span>
        </label>
        <div className="relative">
          <FiAlignLeft className="absolute left-3 top-3 text-base-content/40" />
          <textarea
            name="description"
            required
            value={values.description}
            onChange={onChange}
            rows={4}
            className="textarea textarea-bordered w-full pl-10 rounded-xl"
            placeholder="Explain the purpose of the drive, volunteers required, items being distributed or tasks to complete..."
          />
        </div>
      </div>

      {creatorEmail && (
        <div className="flex items-center justify-between rounded-xl bg-base-200 px-4 py-3 text-sm">
          <span className="text-base-content/60">Organizer Email attached:</span>
          <span className="font-medium">{creatorEmail}</span>
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary w-full rounded-xl gap-2"
        disabled={submitting}
      >
        {submitting ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          <>
            <FiSend /> {submitLabel}
          </>
        )}
      </button>
    </form>
  );
}