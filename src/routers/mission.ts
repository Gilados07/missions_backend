import { PrismaClient } from "@prisma/client";
import express from "express";
const prisma = new PrismaClient();

export const missionRouter = express.Router();
missionRouter.get("/", async (_req, res) => {
  try {
    const mission = await prisma.mission.findMany();
    res.send(mission);
  } catch {
    res.send("DB Error");
  }
});

missionRouter.post("/", async (req, res) => {
  try {
    const id = req.body.id;
    const title = req.body.title;
    const content = req.body.content; //צריך לקבל את זה מהיוזר מראש
    const createdById = req.body.createdById;

    const mission = await prisma.mission.create({
      data: { id, title: title, content, createdById },
    });
    res.send({
      mission,
    });
  } catch {
    res.status(400);
    res.send("Error, invalid data");
  }
});
