import { Modal } from "@/components/ui/modal";
import { createEventAction } from "@/app/events/actions";
import { EventForm } from "@/components/events/event-form";
export default async function CreateEventModal() {
  return (
    <Modal isOpen>
      <EventForm action={createEventAction} />
    </Modal>
  );
}
