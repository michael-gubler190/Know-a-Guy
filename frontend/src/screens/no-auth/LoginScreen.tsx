import { Box, Button, TextField, Typography, Link as MuiLink } from '@mui/material';
import { useNavigate } from 'react-router';
import Navbar from '../../components/Global/Navbar';

function LoginScreen() {
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <Box
      sx={{
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Navbar position='fixed' />

      {/* Left Side: Large Image (Takes up half screen width on desktop) */}
      <Box
        component="img"
        sx={{
          width: { xs: '100%', md: '50%' },
          height: { xs: '40vh', md: '100vh' },
          objectFit: 'cover',
        }}
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqD6Byz1a8yH8IWaO0EAqcURrhbJlb4YhSaSX4Ao44TFqWlR1eubTfPr4&s=10'
        alt="Login visual"
      />

      {/* Right Side: Login Form & Tagline */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: { xs: 4, md: 8 },
          mt: { xs: 0, md: '64px' },
          boxSizing: 'border-box',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '400px' }}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Welcome back!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Log in to manage your connections and service requests.
          </Typography>


          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              required
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
            />
            
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 1, py: 1.5 }}
            >
              Login
            </Button>
          </Box>

          {/* Sign up prompt */}
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <MuiLink
                component="button"
                variant="body2"
                onClick={() => navigate('/signup')}
                sx={{ fontWeight: 'bold', textDecoration: 'none', cursor: 'pointer' }}
              >
                Sign up
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginScreen;