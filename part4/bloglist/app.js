const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const blogsRouter = require('./controllers/blogs');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Import jwt module
const tokenExtractor = require('./utils/tokenExtractor'); // Assuming tokenExtractor middleware is correctly implemented
const User = require('./models/user');
const Blog = require('./models/blog');

// Connect to MongoDB using Mongoose
mongoose.connect(config.MONGODB_URI, {

}).then(() => {
  logger.info('Connected to MongoDB');
}).catch((error) => {
  logger.error('Error connecting to MongoDB:', error.message);
});

app.use(express.json());

// Middleware to extract token
app.use(tokenExtractor);
process.env.SECRET = config.SECRET


// Route to create a new blog post
app.post('/api/blogs', async (request, response, next) => {
  const { title, author, url } = request.body;

  try {
    // Create new blog post
    const blog = new Blog({
      title,
      author,
      url,
    });

    // Save blog post to database
    const savedBlog = await blog.save();

    // Populate user info in the response
    await savedBlog.populate('user', { username: 1, name: 1 }).execPopulate();

    // Return response excluding __v and _id fields
    response.status(201).json({
      id: savedBlog.id,
      title: savedBlog.title,
      author: savedBlog.author,
      url: savedBlog.url,
      likes: savedBlog.likes,
      user: savedBlog.user // Assuming user info is needed
    });
  } catch (error) {
    logger.error('Error saving blog post:', error.message);
    next(error); // Pass error to error handling middleware
  }
});

// Route to create a new user
app.post('/api/users', async (request, response, next) => {
  const { username, password, name } = request.body;

  try {
    // Validate username and password length
    if (!username || !password || username.length < 3 || password.length < 3) {
      return response.status(400).json({ error: 'Username and password must be at least 3 characters long' });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return response.status(400).json({ error: 'Username must be unique' });
    }

    // Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create new user
    const user = new User({
      username,
      name,
      passwordHash,
    });

    // Save user to database
    const savedUser = await user.save();

    // Return response excluding __v and _id fields
    response.status(201).json({
      username: savedUser.username,
      name: savedUser.name,
      blogs: savedUser.blogs // Assuming blogs info is needed
    });
  } catch (error) {
    logger.error('Error saving user:', error.message);
    next(error); // Pass error to error handling middleware
  }
});

// Route for user login and token generation
app.post('/api/login', async (request, response, next) => {
  const { username, password } = request.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return response.status(401).json({ error: 'Invalid username or password' });
    }

    // Check password validity
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      return response.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token
    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, config.JWT_SECRET);

    // Return token and user info
    response.status(200).json({
      token,
      username: user.username,
      name: user.name,
    });
  } catch (error) {
    logger.error('Error logging in:', error.message);
    next(error); // Pass error to error handling middleware
  }
});

// Route to delete a blog
app.delete('/api/blogs/:id', async (request, response, next) => {
  const { id } = request.params;

  try {
    const decodedToken = jwt.verify(request.token, config.JWT_SECRET);

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }

    const blogToDelete = await Blog.findById(id);

    if (!blogToDelete) {
      return response.status(404).json({ error: 'Blog not found' });
    }

    // Check if the logged-in user is the creator of the blog
    if (blogToDelete.user.toString() !== decodedToken.id) {
      return response.status(403).json({ error: 'Unauthorized to delete this blog' });
    }

    await blogToDelete.remove();
    response.status(204).end();
  } catch (error) {
    logger.error('Error deleting blog:', error.message);
    next(error); // Pass error to error handling middleware
  }
});

// Error handling middleware
app.use((error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Invalid token' });
  }

  next(error);
});

// Set up bodyParser after error handling middleware
app.use(bodyParser.json());

// Use blogsRouter for '/api/blogs' route
app.use('/api/blogs', blogsRouter);

module.exports = app;
