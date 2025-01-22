import bcrypt from "bcryptjs";
import { SALT_ROUNDS } from "./constants";

export async function hash(key: string) {
  return bcrypt.hash(key, SALT_ROUNDS);
}
