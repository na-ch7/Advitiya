import db from "../../loaders/db";
import { TalentSchemaType } from "./talent.schema";
import { hash } from "../../shared/utils";

const talentsCollection = async () =>
  (await db()).collection<TalentSchemaType>("talents");

export async function registerTalent(
  talentData: TalentSchemaType,
): Promise<TalentSchemaType> {
  const collection = await talentsCollection();

  const existingTalent = await collection.findOne({ email: talentData.email });
  if (existingTalent) {
    throw {
      statusCode: 409,
      message: "A talent with this email already exists.",
    };
  }

  const hashedPassword = await hash(talentData.password);

  const newTalent: TalentSchemaType = {
    ...talentData,
    password: hashedPassword,
    name: talentData.name,
    skills: talentData.skills,
    personalDescription: talentData.personalDescription,
    profilePhoto: talentData.profilePhoto,
    isApproved: false,
    isDeleted: false,
  };

  await collection.insertOne(newTalent);

  return newTalent;
}

export async function getAllTalents(): Promise<TalentSchemaType[]> {
  const collection = await talentsCollection();
  return await collection
    .find({ isDeleted: false, isApproved: true })
    .toArray();
}
