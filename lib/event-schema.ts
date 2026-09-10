// lib/event-schema.ts
import { normalizeImagePath } from "./helpers";
import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  category: z.string().trim().min(1, "Category is required"),
  date: z.iso.datetime({
    local: true,
    message: "Enter a valid date and time",
  }),
  location: z.string().trim().min(1, "Location is required"),
  description: z.string().trim().min(1, "Description is required"),
  image: z
    .string()
    .trim()
    .min(1, "Image is required")
    .transform(normalizeImagePath),
  attendees: z.coerce.number().int().min(0, "Attendees cannot be negative"),
});
