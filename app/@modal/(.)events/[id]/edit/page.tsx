import { getEvent } from "@/lib/api";
import { Modal } from "@/components/ui/modal";
import { updateEventAction } from "@/app/events/actions";
import { EventForm } from "@/components/events/event-form";
import { notFound } from "next/navigation";
export default async function EditEventModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let event;
  try {
    event = await getEvent(id);
  } catch {
    notFound();
  }
  const updateAction = updateEventAction.bind(null, id);

  return (
    <Modal isOpen>
      {event ? (
        <EventForm event={event} action={updateAction} />
      ) : (
        <p>There was an error retrieving the event information.</p>
      )}
    </Modal>
  );
}
