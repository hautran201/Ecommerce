import express from 'express'
import { getCountUser } from '../controllers/userController.js'
const router = express.Router()

router.get('/get/count', getCountUser)

export default router
