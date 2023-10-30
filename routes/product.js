import express from 'express';

import { getProduct, getAllProducts, addProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

//get product
router.get("/:productId", getProduct)

//get all products
router.get("/", getAllProducts)

//Create product
router.post("/", addProduct)

//Update product
router.patch("/:productId", updateProduct)

//Delete product
router.delete("/:productId", deleteProduct)

export default router;

