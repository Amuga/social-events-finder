import { getEvent } from "@/lib/api";
import Link from "next/link";
import { EventDetail } from "@/components/events/event-detail";

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEvent(Number(id));

  return (
    <main className="flex flex-1 flex-col font-sans w-full max-w-7xl mx-auto items-center py-6 p-4 sm:items-start gap-4">
      <EventDetail event={event} />
      <Link
        href="/"
        className="text-brand-cyan underline underline-offset-4 hover:text-cyan-600 self-center"
      >
        ← Back to main page
      </Link>
    </main>
  );
}
