import * as dotenv from "dotenv";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config({ path: '.env.local' });

const authController = {
    register: async (req, res) => {
        try {
            const { nickname, email, password } = req.body;

            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'This email is already in use' });
            }

            const userId = await User.createUser(nickname, email, password);

            res.status(201).json({ message: 'User successfully created', userId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Account creation error' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(401).json({ message: 'Incorrect email or password' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Incorrect email or password' });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });

            const userData = await User.findById(user.id);

            res.json({
                message: 'Successful connection',
                token,
                user: userData
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Connection error' });
        }
    },

    getProfile: async (req, res) => {
        try {
            const user = await User.findById(req.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error while retrieving profile' });
        }
    }
};

export default authController;