// lib/api.ts
import type { Event } from "@/types";

export const API_URL = "http://localhost:3001";
export const PER_PAGE = 8;

type GetEventsResponse = {
  data: Event[];
  pages: number;
  items: number;
};

export type PaginatedEvents = {
  events: Event[];
  totalPages: number;
  totalItems: number;
};

export async function getEvents(
  page = 1,
  perPage = PER_PAGE,
  search = "",
  category = "",
): Promise<PaginatedEvents> {
  const params = new URLSearchParams({
    _page: String(page),
    _per_page: String(perPage),
  });
  if (search.trim()) {
    params.set("title:contains", search);
  }
  if (category) {
    params.set("category", category);
  }
  const res = await fetch(`${API_URL}/events?${params.toString()}`);

  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.statusText}`);
  }

  const result = (await res.json()) as GetEventsResponse;

  return {
    events: result.data,
    totalPages: result.pages,
    totalItems: result.items,
  };
}

export async function getEvent(id: string): Promise<Event> {
  const res = await fetch(`${API_URL}/events/${id}`);

  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.statusText}`);
  }

  return res.json();
}

export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${API_URL}/events`);

  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.statusText}`);
  }

  const events = (await res.json()) as Event[];

  return [...new Set(events.map((event) => event.category))].sort();
}

export async function createEvent(event: Omit<Event, "id">): Promise<Event> {
  const res = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  if (!res.ok) {
    throw new Error(`Create failed: ${res.statusText}`);
  }

  return res.json();
}

export async function updateEvent(
  id: string,
  event: Partial<Omit<Event, "id">>,
): Promise<Event> {
  const res = await fetch(`${API_URL}/events/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  if (!res.ok) {
    throw new Error(`Update failed: ${res.statusText}`);
  }

  return res.json();
}

export async function deleteEvent(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/events/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Delete failed: ${res.statusText}`);
  }
}
