import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import stripeRoutes from './routes/stripeRoutes.js';
import { handleStripeWebhook } from './controllers/stripeController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());

// Stripe Webhook MUST be placed before express.json() to read raw body
app.post('/api/checkout/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/checkout', stripeRoutes);
app.get('/', (req, res) => {
    res.send('Aura Bijoux API is running...');
});

// Database Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB Atlas');
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch((error) => {
        console.error('❌ Error connecting to MongoDB:', error.message);
        process.exit(1);
    });
