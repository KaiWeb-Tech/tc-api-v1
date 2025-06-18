import * as dotenv from "dotenv";
import pool from '../config/db.js';
import bcrypt from "bcryptjs";

dotenv.config({path: '.env.local'});

export class User {
    constructor(id, nickname, email, auth_provider, roles, created_at, updated_at) {
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.auth_provider = auth_provider;
        this.roles = roles;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static fromJson(json) {
        return new User(json.id, json.nickname, json.email, json.auth_provider, json.roles, json.created_at, json.updated_at);
    }

    static async createUser(nickname, email, password, isGoogleAuth = false) {
        const hashedPassword = isGoogleAuth
            ? await bcrypt.hash(generateRandomPassword(), 10)
            : await bcrypt.hash(password, 10);

        const authProvider = isGoogleAuth ? 'google' : 'local';

        const [result] = await pool.query(
            'INSERT INTO users (nickname, email, password, auth_provider) VALUES (?, ?, ?, ?)',
            [nickname, email, hashedPassword, authProvider]
        );

        if (result.insertId) {
            await pool.query(
                'INSERT INTO settings (user_id) VALUES (?)',
                [result.insertId]
            )
        }

        return result.insertId;
    }

    static async updateProfile(id, nickname, email, password, language) {
        const userUpdates = [];
        const userValues = [];

        if (nickname) {
            userUpdates.push('nickname = ?');
            userValues.push(nickname);
        }
        if (email) {
            userUpdates.push('email = ?');
            userValues.push(email);
        }
        if (password) {
            userUpdates.push('password = ?');
            userValues.push(password);
        }

        if (userUpdates.length > 0) {
            const userQuery = `UPDATE users
                               SET ${userUpdates.join(', ')}
                               WHERE id = ?`;
            await pool.query(userQuery, [...userValues, id]);
        }

        // Mise à jour de la table settings
        if (language) {
            await pool.query(
                'UPDATE settings SET language = ? WHERE user_id = ?',
                [language, id]
            );
        }

        return this.findById(id)
    }

    static async findByEmail(email) {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE email = ?', [email]
        );
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await pool.query(
            'SELECT users.id, users.nickname, users.email, users.avatar, users.auth_provider, users.roles, settings.theme, settings.language, users.created_at, users.updated_at FROM users INNER JOIN settings ON users.id = settings.user_id WHERE id = ?', [id]);
        return rows[0];
    }
}

function generateRandomPassword() {
    return Math.random().toString(36).slice(-8);
}

export default User