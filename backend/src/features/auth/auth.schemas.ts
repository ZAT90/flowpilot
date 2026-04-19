import { z } from 'zod';

const emailSchema = z.string().trim().toLowerCase().email('Please enter a valid email');

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(72, 'Password must be 72 characters or fewer');

export const signupSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be 50 characters or fewer')
      .optional(),
    email: emailSchema,
    password: passwordSchema,
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

export const loginSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: passwordSchema,
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});
