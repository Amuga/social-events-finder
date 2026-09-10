// components/events/delete-event-btn.tsx
"use client";
import { useRef, useState } from "react";

import { useFormStatus } from "react-dom";
import { deleteEventAction } from "@/app/events/actions";
import { Modal } from "@/components/ui/modal";

const DeleteButton = ({
  formRef,
}: {
  formRef: React.RefObject<HTMLFormElement | null>;
}) => {
  const handleConfirm = () => {
    setIsOpen(false);
    formRef.current?.requestSubmit();
  };

  const [isOpen, setIsOpen] = useState(false);

  const { pending } = useFormStatus();

  return (
    <>
      <button
        type="button"
        disabled={pending}
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-red-600 px-4 py-2 text-white disabled:opacity-50 fv-brand"
      >
        {pending ? "Deleting..." : "Delete event"}
      </button>
      <Modal
        isOpen={isOpen}
        title="Delete event"
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
      >
        <p>
          Are you sure you want to delete this event? This action cannot be
          undone.
        </p>
      </Modal>
    </>
  );
};

export function DeleteEventButton({ id }: { id: string }) {
  const action = deleteEventAction.bind(null, id);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form action={action} ref={formRef}>
      <DeleteButton formRef={formRef} />
    </form>
  );
}
