import * as dotenv from "dotenv";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {Category} from "../models/categoryModel.js";
import authMiddleware from "../middlewares/authMiddleware.js";

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

            const categoryId = await Category.createCategory(name, description, color, userId);

            res.status(200).json({message: "Category successfully created", categoryId});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Category creation error'});
        }
    }
}

export default categoryController