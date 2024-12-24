const Blog = require('../models/blog');
const User = require('../models/user');

jest.setTimeout(10000); // sets the timeout to 10 seconds


const initialBlogs = [
  {
    title: "Advanced React Patterns",
    author: "Chris Doe",
    url: "https://advancedreactpatterns.com/",
    likes: 7,
  },
  {
    title: "Refactoring Legacy Code",
    author: "John Doe",
    url: "http://example.com/refactoring-legacy-code",
    likes: 5,
  },
  {
    title: "Efficient String Manipulation",
    author: "Alice Johnson",
    url: "http://example.com/efficient-string-manipulation",
    likes: 12,
  },
  {
    title: "Effective Testing Strategies",
    author: "Mark Smith",
    url: "http://example.com/effective-testing-strategies",
    likes: 10,
  },
  {
    title: "Challenges in TDD",
    author: "Nancy Wilson",
    url: "http://example.com/challenges-in-tdd",
    likes: 0,
  },
  {
    title: "Programming Paradigm Wars",
    author: "Emma Brown",
    url: "http://example.com/programming-paradigm-wars",
    likes: 2,
  },
  {
    title: "Mastering Async/Await in JS",
    author: "Sarah Taylor",
    url: "https://example.com/mastering-async-await",
    likes: 15,
  },
  {
    title: "Future Trends in Web Development",
    author: "James White",
    url: "https://example.com/future-web-trends",
    likes: 20,
  },
  {
    title: "Introduction to Machine Learning",
    author: "Michael Clark",
    url: "https://example.com/intro-to-ml",
    likes: 8,
  },
  {
    title: "Functional Python Programming",
    author: "Olivia Davis",
    url: "https://example.com/functional-python",
    likes: 6,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: 'temporaryTitle', author: 'temporaryAuthor' });
  await blog.save();
  await blog.remove();
  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
