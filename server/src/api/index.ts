import { Router } from "express";
import authController from "./auth/auth.controller";

const router = Router();

export default (): Router => {
  const app = Router();
  app.use('/auth', authController());

  return app;
};
