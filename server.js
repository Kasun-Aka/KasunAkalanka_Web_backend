const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Routes
app.use("/api", require("./routes/messageRoutes"));
app.use("/api/users", require("./routes/userRoutes")); // contains /save-profile and /me
app.use("/api", require("./routes/protectedRoutes")); // extra testing routes

const downloadCVRoute = require('./routes/cv');
app.use('/api/download-cv', downloadCVRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});