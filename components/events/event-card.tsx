import type { Event } from "@/types";

export const EventCard = ({ event }: { event?: Event[] }) => {
  return (
    <article>
      <p>An image</p>
      <p>some tags</p>
      <p>Event title</p>
      <p>desc</p>
    </article>
  );
};
