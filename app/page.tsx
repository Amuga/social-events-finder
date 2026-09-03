import { EventList } from "@/components/events/event-list";
import { getEvents } from "@/lib/api";

export default async function Home() {
  const events = await getEvents();
  return (
    <main className="flex flex-1 flex-col font-sans w-full max-w-7xl mx-auto items-center py-6 p-4 sm:items-start gap-4 ">
      <h1 className="text-3xl">My cool page</h1>
      <EventList events={events} />
    </main>
  );
}
