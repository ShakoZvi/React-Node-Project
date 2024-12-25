import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
    user: '', // PostgreSQL მომხმარებელი
    host: 'localhost',
    database: 'postgres', // ბაზის სახელი
    password: '', // პაროლი (ცარიელი, თუ არ გაქვს პაროლი)
    port: 5432, // PostgreSQL პორტი
});

client.on('error', (err) => {
    console.error('PostgreSQL error:', err);
});

// Connect function
export async function connect() {
    try {
        await client.connect();
        console.log('PostgreSQL connected');
    } catch (err) {
        console.error('Error connecting to PostgreSQL:', err);
        throw err;
    }
}

// Query function
export async function query(text, params) {
    try {
        const result = await client.query(text, params);
        return result;
    } catch (err) {
        console.error('Query error:', err);
        throw err;
    }
}

export default client;
