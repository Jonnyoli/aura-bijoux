import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    author: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
});

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
        },
        images: [
            {
                type: String,
                required: true,
            },
        ],
        reviews: [reviewSchema],
        isCustomizable: {
            type: Boolean,
            default: false,
        },
        isBestSeller: {
            type: Boolean,
            default: false,
        },
        isNew: {
            type: Boolean,
            default: false,
        },
        materials: [String],
        salePrice: Number,
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
