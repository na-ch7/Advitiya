import bcrypt from 'bcryptjs';
import { SALT_ROUNDS } from './constants';
import nodemailer from 'nodemailer';
import twilio from 'twilio';

export async function hash(key: string) {
  return bcrypt.hash(key, SALT_ROUNDS);
}


export class WhatsAppNotification {
  private client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  async sendToAdmin(message: string) {
    return this.client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${process.env.ADMIN_WHATSAPP}`,
      body: message
    });
  }
}

export class EmailNotification {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  async sendToAdmin(subject: string, text: string) {
    return this.transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.ADMIN_EMAIL,
      subject,
      text
    });
  }
}

