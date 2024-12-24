// controllers/users.js

const bcrypt = require('bcryptjs'); // or 'bcrypt' depending on your setup
const User = require('../models/user');

const createUser = async (request, response) => {
  const { username, name, password } = request.body;

  if (!password || password.length < 3) {
    return response.status(400).json({ error: 'Password must be at least 3 characters long' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (request, response) => {
  try {
    const users = await User.find({});
    response.json(users.map(user => user.toJSON()));
  } catch (error) {
    response.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createUser,
  getAllUsers,
};
