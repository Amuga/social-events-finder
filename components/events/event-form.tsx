// components/events/event-form.tsx
"use client";

import { useActionState } from "react";
import type { EventFormState } from "@/app/events/actions";
import type { Event } from "@/types";

type EventFormAction = (
  previousState: EventFormState,
  formData: FormData,
) => Promise<EventFormState>;

type EventFormProps = {
  event?: Event;
  action: EventFormAction;
};

const inputClassName =
  "w-full rounded-lg border border-brand-border bg-brand-light px-3 py-2.5 text-brand-dark shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/30";

const labelClassName = "mb-1.5 block text-sm font-semibold text-brand-navy";

export function EventForm({ event, action }: EventFormProps) {
  const [state, formAction, isPending] = useActionState(action, {});

  return (
    <form
      action={formAction}
      className="mx-auto w-full max-w-3xl overflow-hidden rounded-xl bg-brand-light shadow-sm ring-1 ring-brand-border"
    >
      <div className="border-b border-brand-border px-5 py-5 sm:px-8">
        <h1 className="text-2xl font-bold text-brand-navy">
          {event ? "Update event" : "Create an event"}
        </h1>
        <p className="mt-1 text-sm text-brand-dark/75">
          {event
            ? "Make changes to your event details."
            : "Add the details for your upcoming event."}
        </p>
      </div>

      <div className="space-y-6 px-5 py-6 sm:px-8">
        {state.error && (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {state.error}
          </p>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="title" className={labelClassName}>
              Event title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. Park fika after work"
              defaultValue={event?.title}
              className={inputClassName}
              required
            />
          </div>

          <div>
            <label htmlFor="category" className={labelClassName}>
              Category
            </label>
            <input
              id="category"
              name="category"
              type="text"
              placeholder="e.g. Socials"
              defaultValue={event?.category}
              className={inputClassName}
              required
            />
          </div>

          <div>
            <label htmlFor="date" className={labelClassName}>
              Date and time
            </label>
            <input
              id="date"
              name="date"
              type="datetime-local"
              defaultValue={event?.date?.slice(0, 16)}
              className={inputClassName}
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="location" className={labelClassName}>
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="e.g. Queen's Park"
              defaultValue={event?.location}
              className={inputClassName}
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="description" className={labelClassName}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              placeholder="Tell people what to expect..."
              defaultValue={event?.description}
              className={`${inputClassName} resize-y`}
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="image" className={labelClassName}>
              Image URL
            </label>
            <input
              id="image"
              name="image"
              type="string"
              placeholder="/images/demo.jpg"
              defaultValue={event?.image}
              className={inputClassName}
            />
            <p className="mt-1.5 text-xs text-brand-dark/65">
              Use a path such as `/images/example.jpg` or a full image URL.
            </p>
          </div>

          <div>
            <label htmlFor="attendees" className={labelClassName}>
              Expected attendees
            </label>
            <input
              id="attendees"
              name="attendees"
              type="number"
              min="0"
              defaultValue={event?.attendees ?? 0}
              className={inputClassName}
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end border-t border-brand-border bg-slate-100/70 px-5 py-4 sm:px-8">
        <button
          className="btn btn-primary rounded-lg px-5 py-2.5 font-semibold shadow-sm text-sm"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Saving..." : event ? "Update event" : "Create event"}
        </button>
      </div>
    </form>
  );
}
