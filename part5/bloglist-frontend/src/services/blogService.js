
/*
// src/services/blogService.js
import axios from 'axios';

const baseUrl = '/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog);
  return response.data;
};

const update = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

const setToken = (newToken) => {
  axios.defaults.headers.common['Authorization'] = `bearer ${newToken}`;
};

export default { getAll, create, update, remove, setToken };
*/

// src/services/blogService.js
import axios from 'axios';

const baseUrl = '/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog);
  return response.data;
};

const update = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

// New function to like a blog
const like = async (id) => {
  // Get the current blog data
  const blog = await axios.get(`${baseUrl}/${id}`);
  // Increment the likes count
  const updatedBlog = { ...blog.data, likes: blog.data.likes + 1 };
  // Update the blog data on the server
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog);
  return response.data;
};

const setToken = (newToken) => {
  axios.defaults.headers.common['Authorization'] = `bearer ${newToken}`;
};

export default { getAll, create, update, remove, like, setToken };
