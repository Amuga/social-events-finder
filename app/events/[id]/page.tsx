import { getEvent } from "@/lib/api";
import Link from "next/link";
import { EventDetail } from "@/components/events/event-detail";
import { DeleteEventButton } from "@/components/events/event-delete-btn";
import { EditEventButton } from "@/components/events/event-edit-btn";

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEvent(id);

  return (
    <main className="flex flex-1 flex-col font-sans w-full max-w-7xl mx-auto items-center py-6 p-4 sm:items-start gap-4">
      <EventDetail event={event} />
      <div className="btn-group flex flex-row gap-16 mx-auto">
        <Link
          href="/"
          className="text-brand-cyan underline underline-offset-4 hover:text-cyan-600 content-center fv-brand rounded-lg"
        >
          ← Back to main page
        </Link>
        <div className="btn-group gap-4 flex flex-row">
          <EditEventButton id={id} />
          <DeleteEventButton id={id} />
        </div>
      </div>
    </main>
  );
}
