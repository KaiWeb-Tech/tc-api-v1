import * as dotenv from "dotenv";
import pool from '../config/db.js';
import User from "./userModel.js";

dotenv.config({path: '.env.local'});

export class Card {
    constructor(id, front_side, back_side, description, category_id) {
        this.id = id;
        this.front_side = front_side;
        this.back_side = back_side;
        this.description = description;
        this.category_id = category_id;
    }

    static fromJson(json) {
        return new User(json.id, json.front_side, json.back_side, json.description, json.category_id);
    }

    static async createCard(front_side, back_side, description, category_id) {
        const [result] = await pool.query(
            'INSERT INTO cards (front_side, back_side, description, category_id) VALUES (?, ?, ?, ?)',
            [front_side, back_side, description, category_id]
        )

        return this.findById(result.insertId);
    }

    static async updateCard(id, front_side, back_side, description) {
        const cardUpdates = []
        const cardValues = []

        if (front_side) {
            cardUpdates.push('front_side = ?')
            cardValues.push(front_side)
        }
        if (back_side) {
            cardUpdates.push('back_side = ?')
            cardValues.push(back_side)
        }
        if (description) {
            cardUpdates.push('description = ?')
            cardValues.push(description)
        }

        if (cardUpdates.length > 0) {
            const cardQuery = `UPDATE cards 
                                SET ${cardUpdates.join(', ')} 
                                WHERE id = ?`;

            await pool.query(cardQuery, [...cardValues, id])
        }

        return this.findById(id)
    }

    static async findById(id) {
        const [rows] = await pool.query(
            'SELECT * FROM cards WHERE id = ?', [id]
        )

        return rows[0]
    }

    static async findAll() {
        const [rows] = await pool.query(
            'SELECT * FROM cards'
        )

        return rows
    }

    static async delete(id) {
        const [result] = await pool.query(
            'DELETE FROM cards WHERE id = ?', [id]
        )

        return result[0]
    }
}