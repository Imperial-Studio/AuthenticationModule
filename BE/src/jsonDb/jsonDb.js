//crud using json file
import fs from 'fs/promises';
import path from 'path';
const dbPath = path.join('database', 'db.json');

/**
 * @returns {*} Data
 */
const db = {
    readDb: async () => {
        try {
            const db = await fs.readFile(dbPath, 'utf-8');
            return JSON.parse(db);
        } catch (err) {
            throw new Error(err);
        }
    },

    /**
     * 
     * @param {*} data 
     */
    writeDb: async (data) => {
        try {
            await fs.writeFile(dbPath, JSON.stringify(data));
        } catch (err) {
            throw new Error(err);
        }
    }
}

export default db;
