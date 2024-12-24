// routes/users.js

const usersRouter = require('express').Router();
const User = require('../models/user');

// GET /api/users - Get all users with their blogs
usersRouter.get('/', async (request, response) => {
    try {
        const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 });

        response.json(users);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

module.exports = usersRouter;