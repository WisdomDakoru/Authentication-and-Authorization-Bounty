const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const TOKEN_KEY = process.env.TOKEN_KEY || 'StackUpAuthenticationProject!';

// Register user
const register_user = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        const user = await UserModel.create({ username, password });
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registering user" });
    }
};

// Login user
const login_user = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ where: { username } });
        if (!user || !(await user.validatePassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ username: user.username }, TOKEN_KEY, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error logging in" });
    }
};

// Delete user
const delete_user_by_username = async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }
        await UserModel.destroy({ where: { username } });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting user" });
    }
};

module.exports = {
    register_user,
    login_user,
    delete_user_by_username,
};