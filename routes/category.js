import express from 'express';

import { getAllCategory, addCategory, deleteCategory } from "../controllers/categoryController.js";


const router = express.Router();

router.get("/", getAllCategory)

router.post("/", addCategory)

router.delete("/:categoryId", deleteCategory)




export default router;
