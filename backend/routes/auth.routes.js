import express from 'express';
import { Login, getData, logout } from '../controllers/auth.controller.js';

const router = express.Router();

// Auth routes
router.post('/login', Login);
router.get('/get-user', getData);
router.post('/logout', logout);

export default router; 