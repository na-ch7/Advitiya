import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.string(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
