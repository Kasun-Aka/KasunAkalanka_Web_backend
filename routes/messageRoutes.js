const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middleware/authMiddleware");
const { saveMessage } = require("../controllers/messageController");

router.post("/messages", saveMessage);

module.exports = router;
