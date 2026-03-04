import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Sends an SMS to the store owner's phone when a new order is paid.
 * @param {Object} order - The populated Order object from MongoDB
 */
export const sendOrderSms = async (order) => {
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const fromPhone = process.env.TWILIO_PHONE_NUMBER;
        const ownerPhone = process.env.OWNER_PHONE_NUMBER;

        if (!accountSid || !authToken || !fromPhone || !ownerPhone) {
            console.log('⚠️ Twilio credentials missing in .env. SMS skipped.');
            return false;
        }

        const client = twilio(accountSid, authToken);

        const message = `🔔 Aura Bijoux - Nova Encomenda Paga!
ID: #${order._id.toString().substring(0, 8)} 
Valor: ${order.totalPrice.toFixed(2)}€
Cliente: ${order.shippingAddress.fullName}`;

        const response = await client.messages.create({
            body: message,
            from: fromPhone,
            to: ownerPhone
        });

        console.log(`📱 SMS notification sent to owner: ${response.sid}`);
        return true;
    } catch (error) {
        console.error(`❌ Failed to send SMS notification: ${error.message}`);
        // Do not throw so Stripe webhook doesn't crash on SMS failure
        return false;
    }
};
