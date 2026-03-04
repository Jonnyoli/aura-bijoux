import Stripe from 'stripe';
import dotenv from 'dotenv';
import Order from '../models/Order.js';
import { sendOrderReceiptEmail } from '../utils/emailService.js';
import { sendOrderSms } from '../utils/smsService.js';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create Stripe checkout session
// @route   POST /api/checkout/create-session
// @access  Private
const createCheckoutSession = async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, email } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'No items in order' });
        }

        // 1. Create the order in the database first (with status 'Pending')
        // We calculate the prices securely on the backend (in a real app, you'd fetch prices from DB again)
        const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
        const shippingPrice = itemsPrice > 50 ? 0 : 5; // Free shipping over 50
        const taxPrice = 0; // Assuming tax is included in price for now
        const totalPrice = itemsPrice + shippingPrice + taxPrice;

        // Create pending order
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod: 'Stripe', // General label
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            status: 'Pendente', // Use schema enum
        });

        const createdOrder = await order.save();

        // Map line items for Stripe. Only pass images if they are real public HTTPS URLs.
        // Stripe's servers cannot download images from 'localhost' or relative paths.
        const lineItems = orderItems.map((item) => {
            const isValidUrl = item.image && item.image.startsWith('https://');
            return {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: item.name,
                        images: isValidUrl ? [item.image] : [],
                    },
                    unit_amount: Math.round(item.price * 100), // Stripe expects cents
                },
                quantity: item.qty,
            };
        });

        // Add shipping as a line item if applicable
        if (shippingPrice > 0) {
            lineItems.push({
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: 'Shipping',
                    },
                    unit_amount: Math.round(shippingPrice * 100),
                },
                quantity: 1,
            });
        }

        // 3. Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'mb_way', 'multibanco'],
            customer_email: req.user.email || email,
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/cart`,
            client_reference_id: createdOrder._id.toString(), // Link order to session
            metadata: {
                orderId: createdOrder._id.toString(),
            }
        });

        // 4. Update order with Stripe Session ID
        createdOrder.stripeSessionId = session.id;
        await createdOrder.save();

        res.status(200).json({ sessionId: session.id, url: session.url });

    } catch (error) {
        console.error('Stripe Session Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Handle Stripe webhooks
// @route   POST /api/checkout/webhook
// @access  Public
const handleStripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        // Requires raw body (handled in server.js)
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        try {
            // Find the order by the embedded metadata
            const orderId = session.metadata.orderId;
            const order = await Order.findById(orderId);

            if (order) {
                order.isPaid = true;
                order.paidAt = Date.now();
                order.status = 'Processando'; // Advance the order status
                order.paymentResult = {
                    id: session.payment_intent,
                    status: session.payment_status,
                    update_time: new Date().toISOString(),
                    email_address: session.customer_details.email,
                };

                await order.save();
                console.log(`✅ Order ${orderId} successfully marked as Paid via Webhook.`);

                // Step 5: Send Notifications
                const customerEmail = session.customer_details.email || order.shippingAddress.email;
                if (customerEmail) {
                    await sendOrderReceiptEmail(order, customerEmail);
                }
                await sendOrderSms(order);

            }
        } catch (error) {
            console.error('Error updating order on webhook:', error);
        }
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send();
};

export { createCheckoutSession, handleStripeWebhook };
