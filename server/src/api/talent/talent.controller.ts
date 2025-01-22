import { Request, Response, Router } from "express";
import { registerTalent, getAllTalents } from "./talent.service";
import { TalentSchema } from "./talent.schema";
import { validateRequest } from "../../shared/middlewares/requestValidator";

export async function handleTalentRegistration(req: Request, res: Response) {
  try {
    const talentData = req.body;
    const newTalent = await registerTalent(talentData);

    res.status(201).json({
      message: "Talent registered successfully. Awaiting admin approval.",
      talent: newTalent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function handleGetAllTalents(req: Request, res: Response) {
  try {
    const talents = await getAllTalents();
    res.status(200).json({
      message: "Talents fetched successfully.",
      talents,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export default (): Router => {
  const app = Router();
  app.post(
    "/register",
    validateRequest("body", TalentSchema),
    handleTalentRegistration,
  );
  app.get("/", validateRequest("body", TalentSchema), handleGetAllTalents);
  return app;
};
