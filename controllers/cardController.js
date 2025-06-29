import * as dotenv from "dotenv";
import {Card} from "../models/cardModel.js";
import {Category} from "../models/categoryModel.js";

dotenv.config({path: '.env.local'});

const cardController = {
    post: async (req, res) => {
        try {
            const category = await Category.findById(req.params.categoryId);
            if (!category) {
                return res.status(404).json({message: 'Category not found'});
            }

            const {front_side, back_side, description} = req.body;

            const card = await Card.createCard(front_side, back_side, description, category.id);

            return res.status(200).json(card);
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Card creation error'});
        }
    },

    getById: async (req, res) => {
        try {
            const category = await Category.findById(req.params.categoryId);
            if (!category) {
                return res.status(404).json({message: 'Category not found'});
            }

            const card = await Card.findById(req.params.id);
            if (!card) {
                return res.status(404).json({message: 'Card not found'});
            }

            return res.status(200).json(card);
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error while retrieving card'});
        }
    },

    getList: async (req, res) => {
        try {
            const category = await Category.findById(req.params.categoryId);
            if (!category) {
                return res.status(404).json({message: 'Category not found'});
            }

            const cards = await Card.findAll()
            if (!cards.length) {
                return res.status(404).json({message: 'No card found'});
            }

            return res.status(200).json({data: cards.filter((card) => card.category_id === category.id)});
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error while retrieving cards'});
        }
    },

    updateCard: async (req, res) => {
        const {
            front_side,
            back_side,
            description
        } = req.body;

        try {
            getCategory(req, res).then(async (data) => {
                const card = await Card.updateCard(req.params.id, front_side, back_side, description);
                if (!card) {
                    return res.status(404).json({message: 'Card not found'});
                }

                return res.status(200).json(card);
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({message: 'Error while retrieving card'});
        }
    },

    deleteCard: async (req, res) => {
        try {
            const category = await Category.findById(req.params.categoryId);
            if (!category) {
                return res.status(404).json({message: 'Category not found'});
            }

            const card = Card.findById(req.params.id);
            await Card.delete(req.params.id)
            return res.status(200).json({message: 'Card deleted', id: card.id});
        } catch (error) {
            console.error(error)
            return res.status(500).json({message: 'Error while deleting card'});
        }
    }
}

async function getCategory(req, res) {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
        return res.status(404).json({message: 'Category not found'});
    }

    return category
}

export default cardController