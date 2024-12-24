import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { Delete, Home, ThumbUp } from '@mui/icons-material';
import { increaseLikes, deleteBlog } from '../reducers/blogsReducer';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.login);
  const targetBlogUrl =
    blog.url.startsWith('http://') || blog.url.startsWith('https://')
      ? blog.url
      : `http://${blog.url}`;

  const handleVisitBlog = () => {
    window.open(targetBlogUrl, '_blank');
  };

  const handleIncreaseLikes = async () => {
    dispatch(increaseLikes(blog));
  };

  const handleDeleteBlog = async () => {
    if (window.confirm(`Are you sure you want to remove "${blog.title}" by ${blog.author}?`)) {
      dispatch(deleteBlog(blog));
      navigate('/');
    }
  };

  return (
    <Card
      elevation={3}
      sx={{
        my: 2,
        borderRadius: 2,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#fafafa',
        '&:hover': {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 1 }}>
          {blog.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
          by {blog.author}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {blog.likes} likes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Added by {blog.user.name}
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <ButtonGroup>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleVisitBlog}
            startIcon={<Home />}
            sx={{ mx: 1 }}
          >
            Visit
          </Button>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={handleIncreaseLikes}
            startIcon={<ThumbUp />}
            sx={{ mx: 1 }}
          >
            Like
          </Button>
          {blog.user.username === loggedUser.username && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={handleDeleteBlog}
              startIcon={<Delete />}
              sx={{ mx: 1 }}
            >
              Delete
            </Button>
          )}
        </ButtonGroup>
      </Box>
    </Card>
  );
};

export default BlogCard;
