const nodemailer = require('nodemailer');
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_EMAIL_PASSWORD,
  },
});

export const sender = 'Oreoluwa David';

export default transporter;
