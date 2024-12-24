import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Button, TextField, Typography } from '@mui/material'
import { addNewComment } from '../reducers/blogsReducer'

const BlogCommentForm = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleFormChange = (event) => {
    setComment(event.target.value)
  }

  const handleCommentSubmit = (event) => {
    event.preventDefault()
    if (comment.trim()) {
      dispatch(addNewComment(blog.id, { comment }))
      setComment('')
    }
  }

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Add a Comment
      </Typography>
      <form id="blog-comment-form" onSubmit={handleCommentSubmit} style={{ width: '100%' }}>
        <TextField
          id="blog-comment-input"
          variant="outlined"
          placeholder="Write your comment here..."
          type="text"
          value={comment}
          name="comment"
          fullWidth
          margin="normal"
          onChange={handleFormChange}
          sx={{ mb: 2 }}
        />
        <Button
          id="blog-comment-submit"
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Add Comment
        </Button>
      </form>
    </Box>
  )
}

export default BlogCommentForm
