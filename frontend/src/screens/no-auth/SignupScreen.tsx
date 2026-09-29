import { Box } from '@mui/material';
import Navbar from '../../components/Global/Navbar';
import SignupForm from '../../components/Auth/SignupForm';

function SignupScreen() {

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
      <SignupForm />

      {/* Right Side: Login Form & Tagline */}
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

    </Box>
  );
}

export default SignupScreen;