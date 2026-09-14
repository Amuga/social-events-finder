import { Modal } from "@/components/ui/modal";
import { createEventAction } from "@/app/events/actions";
import { EventForm } from "@/components/events/event-form";
export default async function CreateEventModal() {
  return (
    <Modal isOpen>
      <h1 className="mb-6 text-2xl font-bold">Create new event</h1>
      <EventForm action={createEventAction} />
    </Modal>
  );
}
