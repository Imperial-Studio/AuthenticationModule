import db from "../../jsonDb/jsonDb.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await db.readDb();
        const userId = getUserId(email, data);
        if (userId === null || data[userId].isDeleted) {
            res.status(400).json({ Error: "user doesn't exist" });
        }
        else if (data[userId].failedAttempts == 5 || data[userId].isBlocked) {
            data[userId].isBlocked = true;
            await db.writeDb(data);
            res.status(400).json({ Error: "user is blocked" });
        }
        else if (await bcrypt.compare(password, data[userId].password)) {
            const jwtToken = await loginLogic(userId, data);
            res.status(200).json({ jwtToken });
        }
        else {
            ++data[userId].failedAttempts
            await db.writeDb(data);
            res.status(400).json({ Error: "wrong password" });
        }
    }
    catch (err) {
        res.status(500).json({ Error: `${err}` });
    }
}

/**
 * 
 * @param {string} email 
 * @param {*} data 
 * @returns 
 */
const getUserId = (email, data) => {
    for (const key in data) {
        if (data[key].email === email) {
            return key;
        }
    }
    return null;
}

/**
 * 
 * @param {number} userId 
 * @returns jwtToken
 */
const generateJwtToken = async (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

const loginLogic = async (userId, data) => {
    try {

        data[userId].failedAttempts = 0;
        data[userId].lastLogin = new Date().toTimeString();
        const jwtToken = await generateJwtToken(userId);
        data[userId].jwtToken = jwtToken;
        await db.writeDb(data);
        return jwtToken;
    } catch (err) {
        throw new Error(err);
    }
}

export default login;