import type { Event } from "@/types";
import { EventCard } from "./event-card";
import { Pagination } from "@/components/ui/pagination";

type EventListProps = {
  events: Event[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
};

export const EventList = ({
  events,
  currentPage,
  totalPages,
  totalItems,
}: EventListProps) => {
  return (
    <section className="flex flex-1 flex-col gap-4">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {events.map((e) => (
          <li
            key={e.id}
            className="rounded-xl overflow-hidden border border-brand-border bg-white shadow-sm transition hover:border-brand-cyan hover:shadow-md fw-brand"
          >
            <EventCard event={e} />
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemName="events"
      />
    </section>
  );
};
