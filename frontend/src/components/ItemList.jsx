import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = () => {
    const [items, setItems] = useState([]); // State for storing items
    const [newItem, setNewItem] = useState({ name: '', description: '', price: '' }); // State for new item input
    const [editItem, setEditItem] = useState(null); // State for editing an item

    // Fetch items from API
    useEffect(() => {
        const fetchItems = async () => {
            const response = await axios.get('http://localhost:5000/api/items');
            setItems(response.data);
        };

        fetchItems();
    }, []); // Empty array ensures this runs once when the component mounts

    // Handle form submit to add new item
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editItem) {
            // Send the updated item to the server
            const response = await axios.put(`http://localhost:5000/api/items/${editItem.id}`, newItem);
            
            // If the item was updated successfully, update the state
            setItems(items.map(item => (item.id === editItem.id ? response.data : item)));
            setEditItem(null); // Reset editing item
        } else {
            // Send the new item to the server
            const response = await axios.post('http://localhost:5000/api/items', newItem);
            
            // If the item was added successfully, update the state
            setItems((prevItems) => [...prevItems, response.data]); // Add the new item to the current list
        }

        setNewItem({ name: '', description: '', price: '' }); // Reset form fields
    };

    // Handle item deletion
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/items/${id}`);
            
            // Remove the item from the state after deletion
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    // Handle item editing
    const handleEdit = (item) => {
        setNewItem({ name: item.name, description: item.description, price: item.price });
        setEditItem(item); // Set the item to be edited
    };

    return (
        <div>
            <h2>Items List</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                />
                <button type="submit">{editItem ? 'Update Item' : 'Add Item'}</button>
            </form>

            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.description} - ${item.price}
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                        <button onClick={() => handleEdit(item)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
