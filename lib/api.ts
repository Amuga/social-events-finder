// lib/api.ts
import type { Event } from "@/types";
import { ApiError } from "./api-error";

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

async function request<T>(
  url: string,
  options: RequestInit | undefined,
  messages: {
    default: string;
    notFound?: string;
  },
): Promise<T> {
  let res: Response;

  try {
    res = await fetch(url, options);
  } catch {
    throw new ApiError("Unable to connect to the event service.", 503);
  }

  if (!res.ok) {
    if (res.status === 404 && messages.notFound) {
      throw new ApiError(messages.notFound, 404);
    }

    throw new ApiError(messages.default, res.status);
  }

  try {
    return (await res.json()) as T;
  } catch {
    throw new ApiError("The event service returned an invalid response.", 502);
  }
}

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
  const result = await request<GetEventsResponse>(
    `${API_URL}/events?${params.toString()}`,
    undefined,
    {
      default: "Unable to load events.",
    },
  );

  return {
    events: result.data,
    totalPages: result.pages,
    totalItems: result.items,
  };
}

export async function getEvent(id: string): Promise<Event> {
  return request<Event>(`${API_URL}/events/${id}`, undefined, {
    default: "Unable to load this event.",
    notFound: "Event not found.",
  });
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
  return request<Event>(
    `${API_URL}/events`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    },
    {
      default: "Unable to create the event.",
    },
  );
}

export async function updateEvent(
  id: string,
  event: Partial<Omit<Event, "id">>,
): Promise<Event> {
  return request<Event>(
    `${API_URL}/events/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    },
    {
      default: "Unable to update the event.",
      notFound: "Event not found.",
    },
  );
}

export async function deleteEvent(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/events/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Delete failed: ${res.statusText}`);
  }
}
