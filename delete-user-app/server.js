const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authHandling');
const UserModel = require('./models/UserModel');
const app = express();
const PORT = 4001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.use('/auth', authRoutes);

// Start server and sync database
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await UserModel.sync(); // Sync the database
});
