const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

// To get the profile of the currently logged-in user
router.get('/profile', async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// To get all users
router.get('/records/users', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching user records:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// To get all users with roles
router.get('/roles/user', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching user records:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// To get a single user by ID
router.get('/records/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// To update a user's permissions by ID
router.put('/records/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { permissions } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $set: { permissions } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error updating user permissions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
