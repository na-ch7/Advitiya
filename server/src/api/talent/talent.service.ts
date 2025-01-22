const talentsDB: Talent[] = [];

export function talentLogin() {}

const saveTalentToDB = async (talent: Talent): Promise<Talent> => {
  talentsDB.push(talent);
  return talent;
};

const getTalentsFromDB = async (filter: Partial<Talent>): Promise<Talent[]> => {
  return talentsDB.filter((talent) => {
    return Object.keys(filter).every((key) => {
      return filter[key as keyof Talent] === talent[key as keyof Talent];
    });
  });
};

const updateTalentInDB = async (
  talentId: string,
  updates: Partial<Talent>,
): Promise<Talent | null> => {
  const index = talentsDB.findIndex((talent) => talent.name === talentId); // Assuming name as ID for simplicity
  if (index !== -1) {
    talentsDB[index] = { ...talentsDB[index], ...updates };
    return talentsDB[index];
  }
  return null;
};

const deleteTalentFromDB = async (talentId: string): Promise<boolean> => {
  const index = talentsDB.findIndex((talent) => talent.name === talentId); // Assuming name as ID for simplicity
  if (index !== -1) {
    talentsDB.splice(index, 1);
    return true;
  }
  return false;
};

// Functions using Zod for validation
export const registerTalent = async (talentData: any) => {
  const parsedTalent = TalentSchema.parse({ ...talentData, approved: false });
  return await saveTalentToDB(parsedTalent);
};

export const getAllApprovedTalents = async () => {
  return await getTalentsFromDB({ approved: true });
};

export const approveTalent = async (talentId: string) => {
  return await updateTalentInDB(talentId, { approved: true });
};

export const rejectTalent = async (talentId: string) => {
  return await deleteTalentFromDB(talentId);
};
