import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        orderItems: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'OrderItem',
                required: true,
            },
        ],
        shippingAddress: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        zip: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: 'Pendding',
        },
        totalPrice: {
            type: Number,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', OrderSchema);

export default Order;
