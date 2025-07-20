const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middleware/authMiddleware");
const User = require("../models/user");

// ✅ Save user profile to DB
router.post("/register", verifyFirebaseToken, async (req, res) => {
  const { name, email, phone } = req.body;
  const uid = req.user.uid;

  try {
    let existing = await User.findOne({ uid });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const newUser = new User({ uid, name, email, phone });
    await newUser.save();

    res.status(201).json({ message: "User saved successfully", user: newUser });
  } catch (err) {
    console.error("Error saving user:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get logged-in user profile
router.get("/me", verifyFirebaseToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ error: "User profile not found" });
    }

    res.json({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  } catch (err) {
    console.error("Error fetching user:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;