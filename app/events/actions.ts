"use server";
import * as z from "zod";
import { ApiError } from "@/lib/api-error";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createEvent, updateEvent, deleteEvent } from "@/lib/api";
import { eventSchema } from "@/lib/event-schema";

export type EventFormState = {
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

function formDataToEvent(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    category: String(formData.get("category") ?? ""),
    date: String(formData.get("date") ?? ""),
    location: String(formData.get("location") ?? ""),
    description: String(formData.get("description") ?? ""),
    image: String(formData.get("image") ?? ""),
    attendees: formData.get("attendees"),
  };
}

export async function createEventAction(
  _previousState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const values = formDataToEvent(formData);
  const result = eventSchema.safeParse(values);

  if (!result.success) {
    const flattened = z.flattenError(result.error);

    return {
      fieldErrors: flattened.fieldErrors,
    };
  }
  let event;
  try {
    event = await createEvent(result.data);
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        error: error.message,
      };
    }
    return {
      error: "Unable to create the event.",
    };
  }
  revalidatePath("/");
  revalidatePath(`/events/${event.id}`);

  redirect(`/events/${event.id}`);
}

export async function updateEventAction(
  id: string,
  _previousState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const values = formDataToEvent(formData);
  const result = eventSchema.safeParse(values);

  if (!result.success) {
    const flattened = z.flattenError(result.error);

    return {
      fieldErrors: flattened.fieldErrors,
    };
  }

  try {
    await updateEvent(id, result.data);
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        error: error.message,
      };
    }
    return {
      error: "Unable to update the event.",
    };
  }
  revalidatePath("/");
  revalidatePath(`/events/${id}`);

  redirect(`/events/${id}`);
}

export async function deleteEventAction(id: string) {
  try {
    await deleteEvent(id);
  } catch (error) {
    throw new Error("Unable to delete the event.");
  }
  revalidatePath("/");
  revalidatePath(`/events/${id}`);

  redirect("/");
}
