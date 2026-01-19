const express = require('express');
const router = express.Router();
const path = require('path');
const admin = require('../config/firebase');

router.get('/', async (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized. Token missing.' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (decodedToken) {
      const cvPath = path.join(__dirname, '../assets/K-CV.pdf');
      return res.download(cvPath);
    }
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
