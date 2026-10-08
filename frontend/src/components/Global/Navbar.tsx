import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import { NavLink, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useLogout } from '../../hooks/auth/useLogout';
import { clearUser } from "../../redux/features/auth/authSlice";

interface NavbarProps {
  position: "fixed" | "absolute" | "sticky" | "relative" | "static" | undefined
}

export default function Navbar({position} : NavbarProps) {
  const navigate = useNavigate();

  const {mutate: logout} = useLogout();
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const currentUser = useAppSelector(state => state.auth.user);

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

            {isAuthenticated ? (
              <Box sx={{ ml: 'auto' }}>
                <Typography>
                  Hello, {currentUser?.firstName}
                </Typography>

                <Button 
                  color="inherit"
                  onClick={() => {
                    logout(undefined, {
                      onSuccess: () => {
                        dispatch(clearUser());
                      }
                    })
                  }}
                >
                  Logout
                </Button>
              </Box>
            ) : (
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
            )}

          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

