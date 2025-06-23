import * as dotenv from "dotenv";
import {Category} from "../models/categoryModel.js";

dotenv.config({path: '.env.local'});

const categoryController = {
    post: async (req, res) => {
        try {
            const {name, description, color} = req.body;

            let userId

            const token = req.headers['authorization']?.split(' ')[1];

            if (token) {
                const base64Url = token?.split('.')[1];
                const base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');
                const decoded = JSON.parse(atob(base64));

                if (decoded && decoded.id) {
                    userId = decoded.id;
                }
            }

            const category = await Category.createCategory(name, description, color, userId);

            return res.status(200).json(category);
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Category creation error'});
        }
    },

    getById: async (req, res) => {
        console.log(req.params)
        try {
            const category = await Category.findById(req.params.id);
            if (!category) {
                return res.status(404).json({message: 'Category not found'});
            }

            return res.status(200).json(category);
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error while retrieving category'});
        }
    },

    getList: async (req, res) => {
        try {
            const categories = await Category.findAll()
            if (!categories.length) {
                return res.status(404).json({message: 'No categories found'});
            }

            return res.status(200).json({data: categories});
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error while retrieving categories'});
        }
    },

    updateCategory: async (req, res) => {
        const {
            name,
            description,
            color
        } = req.body
        try {
            const category = await Category.updateCategory(
                req.params.id, name, description, color
            )
            if (!category) {
                return res.status(404).json({message: 'Category not found'});
            }
            return res.status(200).json(category);
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error while updating category'});
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const category = Category.findById(req.params.id);
            if (!category) {
                return res.status(404).json({message: 'Category not found'});
            }
            await Category.delete(req.params.id)
            return res.status(200).json({message: 'Category deleted', id: category.id});
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error while deleting category'});
        }
    }
}

export default categoryController