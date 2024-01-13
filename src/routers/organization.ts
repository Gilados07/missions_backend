import { PrismaClient } from "@prisma/client";
import express, { text } from "express";
import { sendEmail } from "../utils/emailClient";

const prisma = new PrismaClient();

export const organizationRouter = express.Router();

organizationRouter.get("/", async (_req, res) => {
  try {
    const organizations = await prisma.organization.findMany();
    res.send(organizations);
  } catch {
    res.send("DB Error");
  }
});

organizationRouter.get("/:organizationId", async (req, res) => {
  try {
    const organization = await prisma.organization.findFirst({
      where: { id: +req.params.organizationId },
    });

    res.send(organization);
  } catch {
    res.send("DB Error");
  }
});

const generateEmailContent = (
  userName: string,
  organizationName: string,
  inviteLink: string
) => {
  const subject = `${userName} has invited you to join missions`;
  const text = `
  Hello!

  I hope this message finds you well. ${userName} from the ${organizationName} team has sent you an invite link.
  Click here to join ${inviteLink}

  Best regards,
  Gilad Bresinski,
  Intern`;
  return {
    subject,
    text,
  };
};

organizationRouter.post("/sendinvitelink", async (req, res) => {
  try {
    const orgid = req.body.orgid;
    const inviteeEmail = req.body.inviteeEmail;
    const inviteLink = `${req.url}/register/${orgid}`;

    const { subject, text } = generateEmailContent(
      "Omer",
      "GiladComapny",
      inviteLink
    );

    sendEmail(inviteeEmail, subject, text);
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
      const password = req.body.password;

      const organization = await prisma.organization.create({
        data: { industry, name: organizationName },
      });
      if (organization) {
        const user = await prisma.user.create({
          data: {
            email,
            name: userName,
            organizationId: organization.id,
            password,
          },
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
