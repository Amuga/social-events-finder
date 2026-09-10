// app/events/new/page.tsx
import { EventForm } from "@/components/events/event-form";
import { createEventAction } from "../actions";

export default function NewEventPage() {
  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Create event</h1>
      <EventForm action={createEventAction} />
    </main>
  );
}
