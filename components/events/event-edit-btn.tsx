"use client";
import { useRouter } from "next/navigation";

export const EditEventButton = ({ id }: { id: string }) => {
  const router = useRouter();

  const showEditEvent = () => {
    router.push(`/events/${id}/edit`);
  };

  return (
    <button
      type="button"
      className="rounded-lg btn btn-secondary px-4 py-2 text-sm font-semibold fv-brand"
      onClick={showEditEvent}
    >
      Edit Event
    </button>
  );
};
