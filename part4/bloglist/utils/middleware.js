// utils/middleware.js

const jwt = require('jsonwebtoken');
const config = require('./config');
const User = require('../models/user');

// Middleware to extract user information from token
const userExtractor = async (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);
    try {
      const decodedToken = jwt.verify(token, config.JWT_SECRET);
      const user = await User.findById(decodedToken.id);
      if (!user) {
        return response.status(401).json({ error: 'User not found' });
      }
      request.user = user; // Set user to request object
      next();
    } catch (error) {
      next(error); // Forward error to error handler
    }
  } else {
    return response.status(401).json({ error: 'Token missing or invalid' });
  }
};

module.exports = {
  userExtractor,
};
