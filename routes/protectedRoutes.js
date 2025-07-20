const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middleware/authMiddleware");

// Simple test route
router.get("/private", verifyFirebaseToken, (req, res) => {
  res.json({
    message: "You are authenticated 🎉",
    user: req.user,
  });
});

module.exports = router;
