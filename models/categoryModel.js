import * as dotenv from "dotenv";
import pool from '../config/db.js';

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

        return this.findById(result.insertId);
    }

    static async updateCategory(id, name, description, color) {
        const categoryUpdates = []
        const categoryValues = []

        if (name) {
            categoryUpdates.push('name = ?');
            categoryValues.push(name);
        }
        if (description) {
            categoryUpdates.push('description = ?');
            categoryValues.push(description);
        }
        if (color) {
            categoryUpdates.push('color = ?');
            categoryValues.push(color);
        }

        if (categoryUpdates.length > 0) {
            const categoryQuery = `UPDATE categories
                                   SET ${categoryUpdates.join(', ')}
                                   WHERE id = ?`;
            await pool.query(categoryQuery, [...categoryValues, id])
        }

        return this.findById(id)
    }

    static async findById(id) {
        const [rows] = await pool.query(
            'SELECT * FROM categories WHERE id = ?', [id]
        )

        return rows[0];
    }

    static async findAll() {
        const [rows] = await pool.query(
            'SELECT * FROM categories',
        )

        return rows;
    }

    static async delete(id) {
        const [result] = await pool.query(
            'DELETE FROM categories WHERE id = ?', [id]
        )

        return result[0];
    }
}