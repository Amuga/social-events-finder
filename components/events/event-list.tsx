import type { Event } from "@/types";
import { EventCard } from "./event-card";

//TODO: Implement, maybe add location?
export const EventList = ({ events }: { events?: Event[] }) => {
  return (
    <section>
      <h2>Events near Stockholm</h2>
      <EventCard />
    </section>
  );
};
