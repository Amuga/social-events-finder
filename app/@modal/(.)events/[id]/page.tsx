import { notFound } from "next/navigation";
import { getEvent } from "@/lib/api";
import { Modal } from "@/components/ui/modal";
import { EventDetail } from "@/components/events/event-detail";

export default async function EventModal({
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
  return (
    <Modal isOpen={true} title="Event Details">
      <EventDetail event={event} />
    </Modal>
  );
}
