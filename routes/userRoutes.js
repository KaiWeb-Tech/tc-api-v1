import authMiddleware from "../middlewares/authMiddleware.js";
import authController from "../controllers/authController.js";
import express from "express";
const router = express.Router();

router.get('/profile', authMiddleware.verifyToken, authController.getProfile);

export default router