import * as dotenv from "dotenv";
import pool from '../config/db.js';
import bcrypt from "bcryptjs";

dotenv.config({path: '.env.local'});

export class Category {
    constructor(id, name, description, color) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.color = color;
    }

    static fromJson(json) {
        return new Category(json.id, json.name, json.description, json.color);
    }

    static async createCategory(name, description, color, user_id) {
        const [result] = await pool.query(
            'INSERT INTO categories (name, description, color, user_id) VALUES (?, ?, ?, ?)',
            [name, description, color, user_id]
        )

        console.log(result)

        return result.insertId;
    }

    static async updateCategory(id, name, description, color) {

    }
}