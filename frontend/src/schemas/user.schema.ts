import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email()
})

export const ApiCurrentUserSchema = z.object({
    id: z.string(),
    email: z.string()
})

export const LoginDataSchema = z.object({
    email: z.string().email({ message: "Email invalide" }),
    password: z.string(),
})

export type User = z.infer<typeof UserSchema>
export type ApiCurrentUser = z.infer<typeof ApiCurrentUserSchema>
export type LoginData = z.infer<typeof LoginDataSchema>