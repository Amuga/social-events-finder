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
  console.log("url -> ", `${API_URL}/events?${params.toString()}`);

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

export async function getEvent(id: number): Promise<Event> {
  const res = await fetch(`${API_URL}/events/${id}`);

  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.statusText}`);
  }

  return res.json();
}
