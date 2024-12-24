/*
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { PORT, MONGODB_URI } = require('./config/config');
const blogsRouter = require('./routes/blogs');

const app = express();

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware for JSON parsing
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Define API routes
app.use('/api/blogs', blogsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Blog = require('./models/blog');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3003;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/bloglist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

app.post('/api/blogs', async (req, res) => {
  const blog = new Blog(req.body);
  const savedBlog = await blog.save();
  res.json(savedBlog);
});

app.put('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  const updatedBlog = req.body;

  const blog = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true });
  res.json(blog);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
