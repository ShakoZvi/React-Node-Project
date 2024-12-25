import express, { json } from 'express';
import cors from 'cors';
import { connect as redisConnect } from './config/redis.js';
import { connect as dbConnect } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';

const app = express();
// app.use(cors());
// app.use(express.json());

// Middleware
app.use(cors());
app.use(json());

// Connect to PostgreSQL
dbConnect()
    .then(() => console.log('PostgreSQL connected'))
    .catch(err => console.error('PostgreSQL connection error:', err));

// Connect to Redis
redisConnect()
    .then(() => console.log('Redis connected'))
    .catch(err => console.error('Redis connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

// Test Route
app.get('/api/test', (req, res) => {
    res.send('Test route working!');
});

// app.get('/api/auth/login', (req, res) => {
//     console.log('Login request received:', req.body);
//     // Process login logic
// });


// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
