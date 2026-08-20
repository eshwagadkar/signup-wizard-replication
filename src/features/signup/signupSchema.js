import { z } from "zod";

export const usernameSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Username is required.")
    .max(30, "Username must be 30 characters or less.")
    .regex(
      /^[a-zA-Z0-9_.]+$/,
      "Use only letters, numbers, underscores, and periods."
    ),
});

export const nameSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(60, "Name must be 60 characters or less."),
});