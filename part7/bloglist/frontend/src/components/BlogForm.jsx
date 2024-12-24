import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, TextField, Typography } from '@mui/material';
import { createBlog } from '../reducers/blogsReducer';

const BlogForm = ({ toggleFormVisibility }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    url: '',
  });

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await dispatch(createBlog(formData));
    if (result) {
      setFormData({ title: '', author: '', url: '' });
      toggleFormVisibility();
    }
  };

  return (
    <Box
      sx={{
        mt: 3,
        p: 3,
        borderRadius: 2,
        boxShadow: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f9f9f9'
      }}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Add a New Blog
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          id="title"
          label="Blog Title"
          variant="outlined"
          type="text"
          value={formData.title}
          name="title"
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />
        <TextField
          id="author"
          label="Author Name"
          variant="outlined"
          type="text"
          value={formData.author}
          name="author"
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />
        <TextField
          id="url"
          label="Blog URL"
          variant="outlined"
          type="text"
          value={formData.url}
          name="url"
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />
        <Button
          id="submit-blog"
          variant="contained"
          color="secondary"
          type="submit"
          sx={{ mt: 2, width: '100%' }}
        >
          Create Blog
        </Button>
      </form>
    </Box>
  );
};

export default BlogForm;
