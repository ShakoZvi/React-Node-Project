import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// login ფუნქცია
export const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data; // შენახვა/მოგება Token-ი
};

// register ფუნქცია
export const register = async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data; // წარმატებული რეგისტრაცია
};

export const createItem = async (item) => {
    const response = await api.post('/items', item);
    return response.data;
};

export const getItems = async () => {
    const response = await api.get('/items');
    return response.data;
};
