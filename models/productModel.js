import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    richDescription: { type: String, default: "" },
    image: { type: String, default: "" },
    images: [{ type: String }],
    brand: { type: String, default: "" },
    price: { type: Number, default: 0 },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    rating: {
        type: Number,
        default: false
    },
    numReviews: {
        type: Number
    },
    isFeatured: {
        type: Boolean,
        default: 0
    }
}, { timestamps: true })


const Product = mongoose.model("Product", ProductSchema);

export default Product;
