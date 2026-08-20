import { z } from "zod";

export const finalSignupSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address."),

  username: z
    .string()
    .trim()
    .min(1, "Username is required."),

  name: z
    .string()
    .trim()
    .min(1, "Name is required."),

  dob: z.object({
    day: z.number(),
    month: z.number(),
    year: z.number(),
    date: z.date(),
    age: z.number().min(18),
  }),

  pronouns: z
    .array(z.string())
    .min(1, "At least one pronoun is required.")
    .max(3, "You can select up to 3 pronouns."),

  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),

  inviteCode: z
    .string()
    .trim()
    .max(50)
    .optional(),
});