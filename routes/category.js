import express from 'express';

import { getCategory, getAllCategory, addCategory, deleteCategory, updateCategory } from "../controllers/categoryController.js";


const router = express.Router();

router.get("/", getAllCategory)

router.get("/:categoryId", getCategory)

router.post("/", addCategory)

router.patch("/:categoryId", updateCategory)

router.delete("/:categoryId", deleteCategory)




export default router;
