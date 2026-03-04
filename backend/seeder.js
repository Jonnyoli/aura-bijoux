import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const importData = async () => {
    try {
        // Clear all existing data from collections
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // Insert mock users (using create to trigger pre('save') middleware for bcrypt)
        const createdUsers = await User.create(users);

        // Get the admin user (first user from our mock array) to associate as creator of products
        const adminUser = createdUsers[0]._id;

        // Attach admin user id to all mock products
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        // Insert mock products
        await Product.insertMany(sampleProducts);

        console.log('✅ Data successfully imported to MongoDB Atlas!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error importing data: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('🗑️ Data completely destroyed from MongoDB Atlas!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error destroying data: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
