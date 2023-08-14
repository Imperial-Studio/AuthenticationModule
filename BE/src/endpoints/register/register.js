import db from "../../jsonDb/jsonDb.js";
import bcrypt from 'bcrypt';

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const register = async (req, res) => {
    let { email, password } = req.body;
    const data = await db.readDb();

    password = await hashPassword(password);

    const userId = ++data.current_id;

    const date = new Date();
    const newUser = {
        email,
        password,
        registeredAt: date.toTimeString(),
        lastLogin: '',
        failedAttempts: 0,
        isBlocked: false,
        isDeleted: false,
    }
    data[userId] = newUser;
    await db.writeDb(data);
    res.status(200).json({ message: 'user created successfully' });
}

const hashPassword = async (password) => {
    try {

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
    catch (err) {
        console.log(err);
    }

}
export default register;