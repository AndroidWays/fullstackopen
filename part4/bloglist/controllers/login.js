// controllers/login.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const loginRouter = require('express').Router();

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body;

    const user = await User.findOne({ username });

    const passwordCorrect =
        user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
        return response.status(401).json({ error: 'Invalid username or password' });
    }

    // Token payload
    const userForToken = {
        username: user.username,
        id: user._id,
    };

    // Generate token
    const token = jwt.sign(userForToken, process.env.JWT_SECRET);

    user.token = token;
    await user.save();

    response.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
