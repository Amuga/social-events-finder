import { notFound } from "next/navigation";
import { EventForm } from "@/components/events/event-form";
import { getEvent } from "@/lib/api";
import { updateEventAction } from "@/app/events/actions";

type EditEventPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  let event;
  try {
    event = await getEvent(id);
  } catch {
    notFound();
  }

  const updateAction = updateEventAction.bind(null, id);

  return (
    <main className="flex flex-1 flex-col font-sans w-full max-w-7xl mx-auto py-6 p-4 gap-4">
      <EventForm event={event} action={updateAction} />
    </main>
  );
}
