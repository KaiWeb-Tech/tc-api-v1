import authMiddleware from "../middlewares/authMiddleware.js";
import authController from "../controllers/authController.js";
import express from "express";
import categoryController from "../controllers/categoryController.js";
const router = express.Router();

router.post('/categories', authMiddleware.verifyToken, categoryController.post)

export default router;