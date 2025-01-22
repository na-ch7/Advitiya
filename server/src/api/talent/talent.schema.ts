import z from "zod";

export const TalentSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  contact: z.object({
    email: z.string().email(),
    phone: z.string().optional(),
  }),
  skills: z.array(z.string()),
  personalDescription: z.string(),
  profilePhoto: z.string().optional(),
  isApproved: z.boolean().default(false),
  isAdmin: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
});

export type TalentSchemaType = z.infer<typeof TalentSchema>;
