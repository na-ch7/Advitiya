import bcrypt from "bcryptjs";
import generateToken from "../../shared/jwt";
import db from "../../loaders/db";
import { UserSchemaType } from "./auth.schema";
import { TalentSchemaType } from "../talent/talent.schema";
import { hash } from "../../shared/utils";

export async function handleTalentSignUp(credentials: UserSchemaType) {
  const talents = (await db()).collection<TalentSchemaType>("talent");
  const data = await talents.findOne({ email: credentials.email });
  if (data) {
    throw {
      statusCode: 409,
      message: "User already exists",
    };
  }
  const hashedPassword = await hash(credentials.password);

  const newTalent = {
    name: " ",
    email: credentials.email,
    password: hashedPassword,
    contact: {
      email: credentials.email,
      phone: "",
    },
    skills: [],
    personalDescription: "",
    isApproved: false,
    isAdmin: false,
    isDeleted: false,
    profilePhoto: "",
  };

  await talents.insertOne(newTalent);
}

export async function handleClientSignUp(credentials: UserSchemaType) {
  const clients = (await db()).collection<UserSchemaType>("client");
  const data = await clients.findOne({ email: credentials.email });
  if (data) {
    throw {
      statusCode: 409,
      message: "User already exists",
    };
  }
  const hashedPassword = await hash(credentials.password);

  const newClient = {
    email: credentials.email,
    password: hashedPassword,
    role: "client",
  };

  await clients.insertOne(newClient);
}

export async function handleLogin(
  credentials: UserSchemaType,
): Promise<string> {
  const { email, password, role } = credentials;
  const database = await db();

  const collectionName = role === "client" ? "clients" : "users";
  const collection = database.collection(collectionName);

  const user = await collection.findOne({ email });
  if (!user) {
    throw {
      statusCode: 404,
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} not found`,
    };
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw {
      statusCode: 401,
      message: "Unauthorized Access",
    };
  }

  return generateToken(user.email);
}
