import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import { NavLink, useNavigate } from 'react-router';

interface NavbarProps {
  position: "fixed" | "absolute" | "sticky" | "relative" | "static" | undefined
}

export default function Navbar({position} : NavbarProps) {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color='primary' position={position}>
        <Container maxWidth="xl">
          <Toolbar>
            <Typography 
              variant="h6" 
              component={NavLink} 
              to={"/"}
              sx={{ 
                textDecoration: 'none', 
                color: 'inherit' 
              }}
            >
              Know-a-Guy
            </Typography>

            <Box sx={{ ml: 'auto' }}>
              <Button 
                color="inherit"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>

              <Button 
                color="inherit"
                onClick={() => navigate("/signup")}
              >
                Signup
              </Button>
            </Box>

          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

