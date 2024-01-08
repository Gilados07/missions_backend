import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

export const organizationRouter = express.Router();

organizationRouter.get("/", async (_req, res) => {
  try {
    const organization = await prisma.organization.findMany();
    res.send(organization);
  } catch {
    res.send("DB Error");
  }
});

organizationRouter.post("/", async (req, res) => {
  try {
    const organizationName = req.body.organizationName;
    const userName = req.body.userName;
    const industry = req.body.industry;
    const email = req.body.email;

    const organization = await prisma.organization.create({
      data: { industry, name: organizationName },
    });
    const user = await prisma.user.create({
      data: { email, name: userName, organizationId: organization.id },
    });
    res.send({
      organization,
      user,
    });
  } catch {
    res.status(400);
    res.send("Error, invalid data");
  }
});
