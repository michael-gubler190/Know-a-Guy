import { Box, Button, TextField, Typography, Link as MuiLink } from '@mui/material'
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import type { LoginRequest } from '../../models/auth/LoginRequest';
import { useLogin } from '../../hooks/auth/useLogin';

function LoginForm() {
    const navigate = useNavigate();
    const {mutate: login, isPending, isError, error} = useLogin();
    const [loginInfo, setLoginInfo] = useState<LoginRequest>({
      email: "",
      password: ""
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginInfo({
        ...loginInfo,
        [e.target.name]: e.target.value
      });
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(loginInfo, {
          onSuccess: () => console.log("Successfully logged in")
        });
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
              value={loginInfo.email}
              name='email'
              onChange={handleChange}
              disabled={isPending}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={loginInfo.password}
              name='password'
              onChange={handleChange}
              disabled={isPending}
            />
            
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 1, py: 1.5 }}
              disabled={isPending}
            >
              {isPending ? "Logging you in..." : "Login"}
            </Button>
          </Box>

          {isError && (
            <p role='alert'>
              {error.message ?? "Something went wrong. Please try again."}
            </p>
          )}

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