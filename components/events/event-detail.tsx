import Image from "next/image";
import { Calendar, Pin, People } from "@/public/images";
import { getFormattedDate } from "@/lib/helpers";
import type { Event } from "@/types";

export const EventDetail = ({ event }: { event: Event }) => {
  const formattedDate = getFormattedDate(new Date(event.date));

  return (
    <article className="overflow-hidden rounded-xl bg-brand-light mx-auto flex w-full">
      <div className="flex flex-col flex-1 gap-6 p-4 sm:flex-row sm:p-6">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-brand-border sm:w-1/3 sm:shrink-0">
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 640px) 100vw, 320px"
            className="object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h1 className="text-2xl font-bold leading-tight text-brand-navy sm:text-3xl">
              {event.title}
            </h1>

            <span className="rounded-full bg-brand-cyan px-3 py-1 text-sm font-semibold text-brand-light">
              {event.category}
            </span>
          </div>

          <p className="mt-4 leading-7 text-brand-dark">{event.description}</p>

          <dl className="mt-6 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Calendar />
              <div>
                <dt className="font-semibold text-brand-navy">Date</dt>
                <dd className="mt-1 text-brand-dark">
                  <time dateTime={event.date}>{formattedDate}</time>
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Pin />
              <div>
                <dt className="font-semibold text-brand-navy">Location</dt>
                <dd className="mt-1 text-brand-dark">{event.location}</dd>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <People />
              <div>
                <dt className="font-semibold text-brand-navy">Attendees</dt>
                <dd className="mt-1 text-brand-dark">
                  {event.attendees} attending
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </article>
  );
};
