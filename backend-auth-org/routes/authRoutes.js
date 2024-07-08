const { Router } = require('express');
// import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import '../middleware/auth';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
