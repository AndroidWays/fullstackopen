// routes/blogs.js

const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

// POST /api/blogs - Create a new blog
blogsRouter.post('/', async (request, response) => {
    const { title, author, url, likes } = request.body;

    try {
        // Find the first user in the database
        const users = await User.find({});
        const user = users[0]; // Assign the first user found

        const blog = new Blog({
            title,
            author,
            url,
            likes,
            user: user._id, // Assign the user's ID to the blog
        });

        const savedBlog = await blog.save();
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();

        response.status(201).json(savedBlog);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

// GET /api/blogs - Get all blogs with creator information
blogsRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

        response.json(blogs);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

module.exports = blogsRouter;