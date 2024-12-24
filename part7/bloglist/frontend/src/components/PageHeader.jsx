import { Typography } from '@mui/material';

const PageHeader = ({ pageName }) => {
  return (
    <Typography
      variant="h4"
      component="h1"
      sx={{
        pt: 4,
        mb: 4,
        color: 'primary.main',
        textAlign: 'center',
        fontWeight: 'bold',
        borderBottom: '2px solid',
        borderColor: 'secondary.main'
      }}
    >
      {pageName}
    </Typography>
  );
};

export default PageHeader;
