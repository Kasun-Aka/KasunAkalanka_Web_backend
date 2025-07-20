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

// ✅ Allow only your Vercel frontend URL for security
const allowedOrigins = [
  "https://kasun-akalanka-web.vercel.app", // replace with your actual Vercel frontend URL
  "http://localhost:5000" // optional: keep for local dev
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(express.static('public'));

// Serve frontend HTML
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
