import { Box, Button, TextField, Typography, Link as MuiLink } from '@mui/material'
import { useNavigate } from 'react-router';

function LoginForm() {
    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

  return (
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
  )
}

export default LoginForm