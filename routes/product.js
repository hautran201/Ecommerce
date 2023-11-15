import express from 'express';

import {
    getProduct,
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getCountProduct,
    getFeaturedProduct,
    updateGalleryProduct,
} from '../controllers/productController.js';
import uploadFile from '../services/uploadFile.js';

const router = express.Router();

//get count products
router.get('/get/count', getCountProduct);

//get featured products
router.get('/get/featured/:count', getFeaturedProduct);

//get product
router.get('/:productId', getProduct);

//get all products
router.get('/', getAllProducts);

//Create product
router.post('/', uploadFile.single('image'), addProduct);

//Update product
router.put(
    '/gallery-images/:productId',
    uploadFile.array('images', 10),
    updateGalleryProduct
);
router.patch('/:productId', updateProduct);

//Delete product
router.delete('/:productId', deleteProduct);

export default router;
