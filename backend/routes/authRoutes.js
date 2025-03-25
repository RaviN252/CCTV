const express = require('express');
const router = express.Router();
const AuthController = require('../Controllers/authController');
const authMiddleware = require('../Middleware/authMiddleware');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/profile', authMiddleware.authMiddleware, AuthController.getProfile);
router.delete('/:id', authMiddleware.authMiddleware, authMiddleware.adminMiddleware, AuthController.deleteUser);

module.exports = router;
