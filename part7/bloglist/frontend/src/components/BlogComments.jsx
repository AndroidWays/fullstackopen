import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'

const BlogComments = ({ blog }) => {
  const hasComments = blog.comments && blog.comments.length > 0

  return (
    <Box sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        Comments
      </Typography>
      {!hasComments ? (
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          No comments yet
        </Typography>
      ) : (
        <List>
          {blog.comments.map((comment, i) => (
            <ListItem key={i} sx={{ borderBottom: '1px solid #ddd' }}>
              <ListItemText primary={comment} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  )
}

export default BlogComments
