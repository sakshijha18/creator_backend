const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const UserModel = require('../models/UserModel');

// Route to get user profile by ID
router.get('/profile/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// To get all users and get all the users with search functionality
router.get('/records/users', async (req, res) => {
  try {
    const searchKeyword = req.query.search;

    let users;
    if (searchKeyword) {
      const isObjectId = mongoose.Types.ObjectId.isValid(searchKeyword);

      if (isObjectId) {
        users = await UserModel.find({
          _id: searchKeyword,
        });
      } else {
        const regex = new RegExp(searchKeyword, 'i');
        users = await UserModel.find({
          $or: [
            { name: regex },
            { email: regex },
          ],
        }).collation({ locale: 'en', strength: 2 });
      }
    } else {
      users = await UserModel.find();
    }

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

// To update a user's role, permissions, and status by ID
router.put('/records/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { role, permissions, status } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $set: { role, permissions, status } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error updating user role, permissions, and status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
