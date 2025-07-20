const Message = require("../models/message");

const saveMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    

    if (!name || !email || !message || !phone || !subject) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMsg = new Message({ name, email, phone, subject, message });
    await newMsg.save();

    res.status(201).json({ message: "Message saved successfully" });
  } catch (error) {
    console.error("Error saving message:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { saveMessage };
