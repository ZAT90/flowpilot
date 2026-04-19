import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().min(1, 'JWT_EXPIRES_IN is required').default('7d'),
  BCRYPT_SALT_ROUNDS: z.coerce.number().int().min(8).max(14).default(10),
});

export const env = envSchema.parse(process.env);
