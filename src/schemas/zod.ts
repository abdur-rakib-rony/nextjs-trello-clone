import { z } from "zod";

export const registerSchema = z.object({
  first_name: z
    .string()
    .min(2, "First name must contain at least 2 characters"),
  last_name: z.string().min(2, "Last name must contain at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must contain at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().nonempty("Password is required"),
});

export const projectFormSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  members: z.array(z.string()).default([]),
});
