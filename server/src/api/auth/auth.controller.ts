import { Request, Response, NextFunction, Router } from "express";
import {
  handleTalentSignUp,
  handleClientSignUp,
  handleLogin,
} from "./auth.service";
import { UserSchema, UserSchemaType } from "./auth.schema";
import { validateRequest } from "../../shared/middlewares/requestValidator";

export async function talentSignUp(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = req.body;
    const role = "talent";
    const signupCredentials: UserSchemaType = { email, password, role };
    await handleTalentSignUp(signupCredentials);
    res.status(201).json({ message: "Talent signed up successfully" });
  } catch (error) {
    next(error);
  }
}

export async function clientSignUp(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = req.body;
    const role = "client";
    const signupCredentials: UserSchemaType = { email, password, role };
    await handleClientSignUp(signupCredentials);
    res.status(201).json({
      success: true,
      message: "Client signed up successfully",
    });
  } catch (error) {
    next(error);
  }
}
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const credentials = req.body;
    const token = await handleLogin(credentials);
    res.status(200).json({
      success: true,
      message: "Logged in Successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
}

export default (): Router => {
  const app = Router();
  app.post("/login", validateRequest("body", UserSchema), login);
  app.post("/client/signup", validateRequest("body", UserSchema), clientSignUp);
  app.post("/talent/signup", validateRequest("body", UserSchema), talentSignUp);
  return app;
};
