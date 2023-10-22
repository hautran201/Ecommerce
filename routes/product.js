import express from 'express';

import { getProduct, getAllProducts, addProduct, updateProduct } from '../controllers/productController.js';

const router = express.Router();

//get product
router.get("/:id", getProduct)

//get all products
router.get("/", getAllProducts)

//Create product
router.post("/", addProduct)

//Update
router.patch("/:id", updateProduct)

export default router;

