import { Box, Button, TextField, Typography, Link as MuiLink } from '@mui/material'
import { useNavigate } from 'react-router';
import { useSignup } from '../../hooks/auth/useSignup';
import React, { useState } from 'react';
import type { ClientSignupRequest } from '../../models/auth/ClientSignupRequest';

function SignupForm() {
    const navigate = useNavigate();
    const {mutate: signup, isPending, isError, error} = useSignup();
    const [signupInfo, setSignupInfo] = useState<ClientSignupRequest>({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSignupInfo((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        signup(signupInfo, {
          onSuccess: () => console.log("Successfully created account")
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
            Welcome to Know-a-Guy!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Create an account to manage your connections and service requests.
          </Typography>


          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              label="First Name"
              type="text"
              variant="outlined"
              fullWidth
              required
              value={signupInfo.firstName}
              name='firstName'
              onChange={handleChange}
              disabled={isPending}
            />

            <TextField
              label="Last Name"
              type="text"
              variant="outlined"
              fullWidth
              value={signupInfo.lastName}
              name='lastName'
              onChange={handleChange}
              disabled={isPending}
            />
            
            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={signupInfo.email}
              name='email'
              onChange={handleChange}
              disabled={isPending}
            />

            <TextField
              label="Username"
              type="text"
              variant="outlined"
              fullWidth
              value={signupInfo.username}
              name='username'
              onChange={handleChange}
              disabled={isPending}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={signupInfo.password}
              name='password'
              onChange={handleChange}
              disabled={isPending}
            />

            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={signupInfo.confirmPassword}
              name='confirmPassword'
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
              {isPending ? "Creating account..." : "Signup"}
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
              Already have an account?{' '}
              <MuiLink
                component="button"
                variant="body2"
                onClick={() => navigate('/login')}
                sx={{ fontWeight: 'bold', textDecoration: 'none', cursor: 'pointer' }}
              >
                Login
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Box>
  )
}

export default SignupForm;