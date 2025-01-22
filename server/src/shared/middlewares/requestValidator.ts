import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export function validateRequest(
  location: "body" | "query" | "params",
  schema: AnyZodObject,
) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const dataToValidate =
        location === "body"
          ? req.body
          : location === "query"
            ? req.query
            : req.params;

      schema.parse(dataToValidate);
      next();
    } catch (error) {
      res.status(400).json({
        message: "Validation error",
        errors: (error as any).errors,
      });
    }
  };
}
