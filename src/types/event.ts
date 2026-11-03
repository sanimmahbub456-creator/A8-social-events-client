export type EventType =
  | "Cleanup"
  | "Plantation"
  | "Donation"
  | "Blood Drive"
  | "Awareness Campaign"
  | "Other";

export interface EventItem {
  _id: string;
  title: string;
  description: string;
  eventType: EventType;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorEmail: string;
  creatorName?: string;
  createdAt?: string;
  /** Only present on the single-event-details response (GET /events/:id). */
  joinedCount?: number;
}

export interface JoinedEventItem {
  _id: string;
  eventId: string;
  userEmail: string;
  userName?: string;
  eventTitle: string;
  eventDate: string;
  eventType: EventType;
  location: string;
  thumbnail: string;
  joinedAt: string;
}

export const EVENT_TYPES: EventType[] = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Blood Drive",
  "Awareness Campaign",
  "Other",
];