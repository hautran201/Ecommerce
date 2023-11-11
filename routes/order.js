import express from 'express';
import {
    addOrder,
    getAllOrder,
    getOrder,
    updateOrder,
    deleteOrder,
} from '../controllers/orderController.js';

const router = express.Router();

router.get('/', getAllOrder);
router.get('/:id', getOrder);

router.post('/', addOrder);

router.patch('/:id', updateOrder);

router.delete('/:id', deleteOrder);

export default router;
