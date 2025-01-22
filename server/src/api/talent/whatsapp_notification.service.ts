import { Twilio } from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;
const client = new Twilio(accountSid, authToken);

export async function sendWhatsAppMessage(
  to: string,
  message: string,
): Promise<void> {
  try {
    await client.messages.create({
      from: `whatsapp:${whatsappNumber}`,
      to: `whatsapp:${to}`,
      body: message,
    });
    console.log(`WhatsApp message sent to ${to}`);
  } catch (error) {
    console.error("Failed to send WhatsApp message:", error);
    throw {
      statusCode: 500,
      message: "Failed to send WhatsApp message",
    };
  }
}
