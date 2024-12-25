import { redisClient } from '../config/redis.js'; // Adjust the path as necessary
import { pool } from '../config/db.js'; // Adjust the path as necessary

export async function getItems() {
    const cacheKey = 'items';
    try {
        const cachedItems = await redisClient.get(cacheKey);
        if (cachedItems) {
            console.log('Cache hit');
            return JSON.parse(cachedItems);
        } else {
            console.log('Cache miss, fetching new data');
            // Fetch data from PostgreSQL table
            const items = await fetchItemsFromPostgres();
            await redisClient.set(cacheKey, JSON.stringify(items), 'EX', 3600); // Cache for 1 hour
            return items;
        }
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
}

async function fetchItemsFromPostgres() {
    try {
        const client = await pool.connect();
        const res = await client.query('SELECT * FROM items');
        client.release();
        return res.rows;
    } catch (error) {
        console.error('Error fetching items from PostgreSQL:', error);
        throw error;
    }
}
