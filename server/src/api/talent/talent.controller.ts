import {
  type Request,
  type Response,
  type NextFunction,
  Router,
} from "express";
import {
  registerTalent,
  getAllApprovedTalents,
  approveTalent,
  rejectTalent,
} from "./talent.service";

export const handleTalentRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const talent = await registerTalent(req.body);
    res.status(200).json({
      success: true,
      message: "Talent Registered",
      talent,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchApprovedTalents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const talents = await getAllApprovedTalents();
    res.status(200).json(talents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching talents.", error });
  }
};

export const approveTalentProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updatedTalent = await approveTalent(req.params.talentId);
    res.status(200).json({ message: "Talent approved.", updatedTalent });
  } catch (error) {
    res.status(500).json({ message: "Error approving talent.", error });
  }
};

export const rejectTalentProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await rejectTalent(req.params.talentId);
    res.status(200).json({ message: "Talent rejected." });
  } catch (error) {
    res.status(500).json({ message: "Error rejecting talent.", error });
  }
};
