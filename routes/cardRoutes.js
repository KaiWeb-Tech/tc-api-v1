import authMiddleware from "../middlewares/authMiddleware.js";
import express from "express";
import cardController from "../controllers/cardController.js";
const router = express.Router();

router.post('/categories/:categoryId/cards', authMiddleware.verifyToken, cardController.post);
router.get('/categories/:categoryId/cards/:id', authMiddleware.verifyToken, cardController.getById);
router.get('/categories/:categoryId/cards', authMiddleware.verifyToken, cardController.getList);
router.put('/categories/:categoryId/cards/:id', authMiddleware.verifyToken, cardController.updateCard);
router.delete('/categories/:categoryId/cards/:id', authMiddleware.verifyToken, cardController.deleteCard);

export default router