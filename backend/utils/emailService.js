import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create a generic transporter. The user will need to configure their SMTP details in .env
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * Sends an email receipt to the customer and a notification to the admin.
 * @param {Object} order - The populated Order object from MongoDB
 * @param {String} userEmail - The customer's email address
 */
export const sendOrderReceiptEmail = async (order, userEmail) => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

        const htmlTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                <h1 style="color: #d4af37; text-align: center;">Aura Bijoux</h1>
                <h2>Obrigado pela sua encomenda!</h2>
                <p>A sua encomenda <strong>#${order._id}</strong> foi confirmada e está a ser processada.</p>
                
                <h3>Detalhes da Encomenda:</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr style="background-color: #f8f8f8; border-bottom: 1px solid #ddd;">
                        <th style="padding: 10px; text-align: left;">Artigo</th>
                        <th style="padding: 10px; text-align: center;">Qtd</th>
                        <th style="padding: 10px; text-align: right;">Preço</th>
                    </tr>
                    ${order.orderItems.map(item => `
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 10px;">${item.name}</td>
                            <td style="padding: 10px; text-align: center;">${item.qty}</td>
                            <td style="padding: 10px; text-align: right;">${item.price.toFixed(2)}€</td>
                        </tr>
                    `).join('')}
                </table>

                <p style="text-align: right; font-size: 1.2em; font-weight: bold;">
                    Total Pago: ${order.totalPrice.toFixed(2)}€
                </p>

                <h3>Morada de Envio:</h3>
                <p>
                    ${order.shippingAddress.fullName}<br>
                    ${order.shippingAddress.address}<br>
                    ${order.shippingAddress.postalCode} ${order.shippingAddress.city}<br>
                    ${order.shippingAddress.country}
                </p>

                <div style="margin-top: 40px; text-align: center; font-size: 0.9em; color: #888;">
                    <p>Se tiver alguma dúvida, entre em contacto connosco.</p>
                    <p>&copy; ${new Date().getFullYear()} Aura Bijoux. Todos os direitos reservados.</p>
                </div>
            </div>
        `;

        const mailOptions = {
            from: `"Aura Bijoux" <${process.env.EMAIL_USER}>`,
            to: `${userEmail}, ${adminEmail}`, // Sends to both client and admin
            subject: `Confirmação de Encomenda #${order._id.toString().substring(0, 8)}`,
            html: htmlTemplate,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`✉️ Receipt email sent: ${info.messageId}`);
        return true;
    } catch (error) {
        console.error(`❌ Failed to send email receipt: ${error.message}`);
        // We don't throw to prevent crashing the webhook if email fails
        return false;
    }
};
