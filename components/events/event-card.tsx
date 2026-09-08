"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Calendar, Pin, People, Heart } from "@/public/images";
import { getFormattedDate } from "@/lib/helpers";
import type { Event } from "@/types";

export const EventCard = ({ event }: { event: Event }) => {
  const router = useRouter();
  const [showEventLink, setShowEventLink] = useState(false);
  const [eventUrl, setEventUrl] = useState("");
  const showEventDetails = () => {
    router.push(`/events/${event.id}`);
  };
  const toggleEventLink = () => {
    setEventUrl(
      new URL(`/events/${event.id}`, window.location.origin).toString(),
    );

    setShowEventLink(!showEventLink);
  };
  return (
    <article className="group flex h-full flex-col">
      <div className="relative h-44 w-full overflow-hidden bg-brand-border">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, 384px"
          className="object-cover transition-transform duration-300 group-hover:scale-105 hover:cursor-pointer"
          onClick={showEventDetails}
        />
        <span className="absolute left-3 top-3 rounded-full bg-brand-light/95 px-3 py-1 text-xs font-semibold text-brand-cyan shadow-sm backdrop-blur">
          {event.category}
        </span>
        <button
          type="button"
          aria-label={`Favorite ${event.title}`}
          className="absolute right-3 top-3 rounded-full bg-transparent p-2 text-brand-orange transition-colors md:opacity-0 group-hover:opacity-100 fv-brand focus-visible:opacity-100 cursor-pointer"
        >
          <Heart />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4 bg-brand-light">
        <h3 className="line-clamp-2 font-bold leading-tight text-brand-navy">
          {event.title}
        </h3>

        <div className="flex flex-col gap-2 text-sm text-brand-dark">
          <div className="flex items-center gap-2">
            <Calendar />
            <time dateTime={event.date}>
              {getFormattedDate(new Date(event.date))}
            </time>
          </div>

          <div className="flex items-center gap-2">
            <Pin />
            <span className="line-clamp-1">{event.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <People />
            <span>{event.attendees} attending</span>
          </div>
        </div>
        <div className="flex flex-row flex-1 items-end justify-between">
          <button
            type="button"
            onClick={showEventDetails}
            className="rounded-lg btn-primary px-4 py-2 text-sm font-semibold fv-brand"
          >
            View Details
          </button>
          <button
            type="button"
            className="rounded-lg btn-secondary px-4 py-2 text-sm font-semibold fv-brand"
            onClick={toggleEventLink}
          >
            {showEventLink ? "Hide Link" : "Share"}
          </button>
        </div>
        {showEventLink && (
          <p
            role="status"
            className="max-w-56 text-xs text-brand-cyan self-center"
          >
            {eventUrl}
          </p>
        )}
      </div>
    </article>
  );
};
