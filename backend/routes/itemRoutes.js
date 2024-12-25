import { Router } from 'express';
import { getItems, createItem, updateItem, deleteItem } from '../controllers/itemController.js';
const router = Router();

// Route to get all items
router.get('/', getItems);

// Route to create a new item
router.post('/', createItem);

// Route to update an item by ID
router.put('/:id', updateItem);

// Route to delete an item by ID
router.delete('/:id', deleteItem);

export default router;
