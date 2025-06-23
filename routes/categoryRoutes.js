import authMiddleware from "../middlewares/authMiddleware.js";
import authController from "../controllers/authController.js";
import express from "express";
import categoryController from "../controllers/categoryController.js";
const router = express.Router();

router.post('/categories', authMiddleware.verifyToken, categoryController.post)
router.get('/categories/:id', authMiddleware.verifyToken, categoryController.getById)
router.get('/categories', authMiddleware.verifyToken, categoryController.getList)
router.put('/categories/:id', authMiddleware.verifyToken, categoryController.updateCategory)
router.delete('/categories/:id', authMiddleware.verifyToken, categoryController.deleteCategory)

export default router;