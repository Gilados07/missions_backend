import { PrismaClient } from "@prisma/client";
import { error } from "console";
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

organizationRouter.post("/sendinvitelink", async (req, res) => {
  try {
    const orgid = req.body.orgid;
    const link = orgid + "/";
    return link;
  } catch {
    res.send("The link is unvalid");
  }
});
organizationRouter.post("/", async (req, res) => {
  let transaction;
  try {
    transaction = await prisma.$transaction(async (prisma) => {
      const organizationName = req.body.organizationName;
      const userName = req.body.userName;
      const industry = req.body.industry;
      const email = req.body.email;

      const organization = await prisma.organization.create({
        data: { industry, name: organizationName },
      });
      if (organization) {
        const user = await prisma.user.create({
          data: { email, name: userName, organizationId: organization.id },
        });
        res.send({
          organization,
          user,
        });
      }
    });
  } catch (err) {
    console.error("Transaction Error:", err);
    res.send("Error");
  }
});
