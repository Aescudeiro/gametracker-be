import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3000),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  X_RAPIDAPI_KEY: z.string(),
  X_RAPIDAPI_HOST: z.string(),
  FDA_API_URL: z.string(),
})

export type Env = z.infer<typeof envSchema>
