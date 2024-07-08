const { Router } = require('express');
// import { Router } from 'express';
// import { registerUser, loginUser } from '../controllers/authController';
const { registerUser, loginUser } = require('../controllers/authController');
// import '../middleware/auth';
require('../middleware/auth');

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

module.export = router;
