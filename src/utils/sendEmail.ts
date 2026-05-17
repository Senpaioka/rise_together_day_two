import nodemailer from "nodemailer";
import env from "../config/env.js";

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS
    }
});

console.log("EMAIL_USER:", env.EMAIL_USER);
console.log("EMAIL_PASS:", env.EMAIL_PASS);

type SendEmailOptions = {
    to: string;
    subject: string;
    html: string;
};

const sendEmail = async (
    options: SendEmailOptions
) => {

    await transporter.sendMail({
        from: env.EMAIL_USER,
        to: options.to,
        subject: options.subject,
        html: options.html
    });
};

export default sendEmail;