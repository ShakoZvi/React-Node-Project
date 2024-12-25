import db from '../config/db.js';

// Get all items
export const getItems = async (_req, res) => {
    try {
        const result = await db.query('SELECT * FROM items');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching items' });
    }
};

// Get a single item by ID
export const getItemById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM items WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching item' });
    }
};

// Create a new item
export const createItem = async (req, res) => {
    const { name, description, price } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO items (name, description, price) VALUES ($1, $2, $3) RETURNING *',
            [name, description, price]
        );

        const newItem = result.rows[0]; // Get the newly created item
        res.status(201).json(newItem); // Send back the new item
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ error: 'Error adding item' });
    }
};

// Update an item by ID
export const updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    try {
        const result = await db.query(
            'UPDATE items SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *',
            [name, description, price, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.status(200).json(result.rows[0]); // Send the updated item back in the response
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ error: 'Error updating item' });
    }
};

// Delete an item by ID
export const deleteItem = async (req, res) => {
    const { id } = req.params;

    try {
        // Delete item from database
        const result = await db.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ error: 'Error deleting item' });
    }
};

// No need to export again, because each function has already been exported individually
