import React from 'react';
import { Button, Container, TextField, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Add your login logic here (authentication, validation, etc.)
    // For now, it simply navigates to the /driver route
    navigate('/driver');
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ mt: 3 }}
          fullWidth
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;

