const API_URL = "http://localhost:3001";
import type { Event } from "@/types";

export async function getEvents(): Promise<Event[]> {
  const res = await fetch(`${API_URL}/events`);
  if (!res.ok) throw new Error(`Fetch failed: ${res.statusText}`);
  return res.json();
}
export async function getEvent(id: number): Promise<Event> {
  console.log("huh", id);
  const res = await fetch(`${API_URL}/events/${id}`);
  if (!res.ok) throw new Error(`Fetch failed: ${res.statusText}`);
  return res.json();
}
