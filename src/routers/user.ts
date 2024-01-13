import { PrismaClient } from "@prisma/client";
import express from "express";
const prisma = new PrismaClient();

export const userRouter = express.Router();

userRouter.get("/", async (_req, res) => {
  try {
    const user = await prisma.user.findMany();
    res.send(user);
  } catch {
    res.send("DB Error");
  }
});
userRouter.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const userName = req.body.userName;
    const password = req.body.password;
    const organizationId = req.body.organizationId; //צריך לקבל את זה מהיוזר מראש

    const user = await prisma.user.create({
      data: { email, name: userName, organizationId, password },
    });
    res.send({
      user,
    });
  } catch {
    res.status(400);
    res.send("Error, invalid data");
  }
});
