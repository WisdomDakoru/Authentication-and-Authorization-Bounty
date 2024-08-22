const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authentication, authorisation } = require('../middlewares/authMiddleware');

// Registration route
router.post('/register', (req, res) => authController.register_user(req, res));

// Login route
router.post('/login', (req, res) => authController.login_user(req, res));

// Delete user route
router.post('/delete/user', authentication, authorisation({ isAdmin: false }), (req, res) => authController.delete_user_by_username(req, res));

module.exports = router;