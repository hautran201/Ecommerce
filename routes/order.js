import express from 'express';
import {
    addOrder,
    getAllOrder,
    getOrder,
    updateOrder,
    deleteOrder,
    getTotalSales,
    getCountOrders,
    getUserOrder,
} from '../controllers/orderController.js';

const router = express.Router();

router.get('/', getAllOrder);
router.get('/:id', getOrder);
router.get('/get/total-sales', getTotalSales);
router.get('/get/count', getCountOrders);
router.get('/get/user-order/:userId', getUserOrder);

router.post('/', addOrder);

router.patch('/:id', updateOrder);

router.delete('/:id', deleteOrder);

export default router;
