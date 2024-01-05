const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

// for signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      status: 'Active',
    });

    const savedUser = await newUser.save();

    // Generate a token after user is saved
    const token = jwt.sign({ userId: savedUser._id, userName : savedUser.name }, 'your-secret-key', {
      expiresIn: '1d',
    });

    res.status(200).json({
      success: true,
      token: token,
      userId: savedUser._id,
      userName: savedUser.name,
      status: user.status,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// for login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, userName: user.name }, 'your-secret-key', {
      expiresIn: '1d',
    });

    res.status(200).json({
      success: true,
      token: token,
      userId: user._id,
      userName: user.name,
      status: user.status,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// for logout
router.post('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
