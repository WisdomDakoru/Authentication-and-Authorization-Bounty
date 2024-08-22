const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const TOKEN_KEY = process.env.TOKEN_KEY || 'StackUpAuthenticationProject!';

// Register user
const register_user = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input fields
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Check if the username is already taken
        const existingUser = await UserModel.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json({ message: "Username already taken" });
        }

        // Create new user
        const user = await UserModel.create({ username, password });
        res.status(201).json({ message: "User registered successfully", user: { username: user.username } });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Error registering user" });
    }
};

// Login user
const login_user = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input fields
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Find the user
        const user = await UserModel.findOne({ where: { username } });
        if (!user || !(await user.validatePassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate token
        const token = jwt.sign({ username: user.username }, TOKEN_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Error logging in" });
    }
};

// Delete user by username
const delete_user_by_username = async (req, res) => {
    try {
        const { username } = req.body;

        // Check if username is provided
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }

        // Check if the user exists
        const user = await UserModel.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete the user
        await UserModel.destroy({ where: { username } });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete User Error:", error);
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};

module.exports = {
    register_user,
    login_user,
    delete_user_by_username,
};