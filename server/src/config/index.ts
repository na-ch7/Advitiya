import dotenv from "dotenv";
import z from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string(),
  NODE_ENV: z.string(),
  MONGODB_URI: z.string(),
  JWT_SECRET: z.string(),
  TWILIO_ACCOUNT_SID: z.string(),
  TWILIO_AUTH_TOKEN: z.string(),
  TWILIO_WHATSAPP_NUMBER: z.string(),
  ADMIN_WHATSAPP_NUMBER: z.string(),
});

const env = envSchema.parse(process.env);
export type EnvSchemaType = z.infer<typeof envSchema>;

export default {
  PORT: env.PORT,
  NODE_ENV: env.NODE_ENV,
  MONGODB_URI: env.MONGODB_URI,
  JWT_SECRET: env.JWT_SECRET,
  TWILIO_ACCOUNT_SID: env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: env.TWILIO_AUTH_TOKEN,
  TWILIO_WHATSAPP_NUMBER: env.TWILIO_WHATSAPP_NUMBER,
  ADMIN_WHATSAPP_NUMBER: env.ADMIN_WHATSAPP_NUMBER,

  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  api: {
    prefix: "/api",
  },
};
