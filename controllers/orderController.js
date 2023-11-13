import OrderItem from '../models/orderItemModel.js';
import Order from '../models/orderModel.js';

export const getAllOrder = async (req, res) => {
    try {
        const orderList = await Order.find()
            .populate('user', 'name')
            .sort({ createdAt: -1 });
        if (!orderList) {
            return res.status(400).json({ message: 'There are no orders' });
        }
        res.status(200).json(orderList);
    } catch (error) {
        res.status(500).json({ message: '', error });
    }
};

export const getCountOrders = async (req, res) => {
    try {
        const orderCount = await Order.countDocuments();
        if (!orderCount) {
            return res
                .status(400)
                .json({ message: 'There are not enough orders' });
        }
        res.status(200).json(orderCount);
    } catch (error) {
        res.status(500).json('The order ');
    }
};

export const getTotalSales = async (req, res) => {
    try {
        const totalSales = await Order.aggregate([
            { $group: { _id: null, totalsales: { $sum: '$totalPrice' } } },
        ]);

        if (!totalSales) {
            return res.status(400).json('The order sale cannot be ganerated');
        }

        res.send({ totalSales: totalSales.pop().totalsales });
    } catch (error) {
        res.status(500).json({ message: '', error });
    }
};

export const getUserOrder = async (req, res) => {
    try {
        let userOrder = await Order.find({ user: req.params.userId }).populate({
            path: 'orderItems',
            populate: {
                path: 'product',
                populate: 'category',
            },
        });

        res.status(200).json({ userOrder: userOrder });
    } catch (error) {
        res.status(500).json({ message: '', error });
    }
};

export const getOrder = async (req, res) => {
    try {
        const orderList = await Order.findById(req.params.id)
            .populate('user', 'name')
            .populate({
                path: 'orderItems',
                populate: {
                    path: 'product',
                    populate: 'category',
                },
            });
        if (!orderList) {
            return res.status(400).json({ message: 'Order not found' });
        }
        res.status(200).json(orderList);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const addOrder = async (req, res) => {
    try {
        const orderItemIds = Promise.all(
            req.body.orderItems.map(async (orderItem) => {
                let newOrderItems = new OrderItem({
                    ...orderItem,
                });
                newOrderItems = await newOrderItems.save();
                return newOrderItems._id;
            })
        );

        const orderItemsIdsResovle = await orderItemIds;
        if (!orderItemsIdsResovle) {
            return res.status(401).json('Khong co san pham');
        }

        let orderPrices = await Promise.all(
            orderItemsIdsResovle.map(async (orderItemId) => {
                const orderItem = await OrderItem.findById(
                    orderItemId
                ).populate('product', 'price');
                const totalPrice = orderItem.product.price * orderItem.quantity;
                return totalPrice;
            })
        );

        const totalPrice = orderPrices.reduce(
            (result, value) => result + value
        );

        const newOrder = new Order({
            ...req.body,
            totalPrice: totalPrice,
            orderItems: orderItemsIdsResovle,
        });

        const order = await newOrder.save();
        res.status(201).json({
            message: 'Order placed successfully',
            order,
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, {
            status: req.body.status,
        });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(201).json({
            message: 'Order updated successfully',
            order,
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const id = req.params.id;

        const order = await Order.findById(id);

        if (order) {
            await order.orderItems.map(async (orderItem) => {
                await OrderItem.findByIdAndDelete(orderItem._id);
            });

            await Order.findByIdAndDelete(id);
            return res
                .status(200)
                .json({ message: 'Order delete successfully' });
        }
        res.status(404).json({ message: 'Order not found' });
    } catch (error) {
        res.status(500).json({ message: 'Order deletion failed', error });
    }
};
