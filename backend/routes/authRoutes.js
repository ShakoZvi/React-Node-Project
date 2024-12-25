import { Router } from 'express';
import { registerUser, loginUser, getUserById } from '../controllers/UserController.js';
import { authenticate } from '../middlewares/AuthMiddleware.js'; // Import the authenticate middleware

const router = Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to log in a user
router.post('/login', loginUser);


// Protected route to get user profile (requires authentication)
router.get('/profile/:id', authenticate, getUserById);

export default router;
