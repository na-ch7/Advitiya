import type Express from "express";
import express from "./express";
import LoggerInstance from "./logger";
import db from "./db";

export default async ({
  expressApp,
}: {
  expressApp: Express.Application;
}): Promise<void> => {
  await db();
  LoggerInstance.info(`Connection to database successful`);

  express({ app: expressApp });
  LoggerInstance.info("Express App Intialized");
  LoggerInstance.info("All modules loaded!");
};
