import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import AirbnbReviewEmail from "./mailTemplates/AirbnbReviewEmail";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  from: "no-reply@no-reply.com",
});

interface Props {
  to: string;
  id: string;
  host: string;
}

export const sendVerificationMail = async ({ to, id, host }: Props) => {
  const link = `${host}/api/verify-email?token=${id}`;
  const html = render(<AirbnbReviewEmail link={link} />, {
    pretty: true,
  });

  await transporter.sendMail({
    from: "no-reply@no-reply.com",
    to,
    subject: "Email confirmation from Airbnb clone",
    html,
  });
};
