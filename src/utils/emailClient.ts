import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Replace with your email address
    to,
    subject,
    text,
  };
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error);
    }
    console.log("Email sent: " + info.response);
  });
};
