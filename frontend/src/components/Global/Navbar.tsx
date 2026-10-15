import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import {
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useLogout } from "../../hooks/auth/useLogout";
import { clearUser } from "../../redux/features/auth/authSlice";
import "../../styles/navbar.css";

interface NavbarProps {
  position: "fixed" | "absolute" | "sticky" | "relative" | "static" | undefined;
}

const NAV_LINKS = [
  { label: "Find Pros", to: "/home" },
];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function Navbar({ position }: NavbarProps) {
  const navigate = useNavigate();

  const { mutate: logout } = useLogout();
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const currentUser = useAppSelector((state) => state.auth.user);
  const firstName = currentUser?.firstName;

  // Account dropdown: the anchor element doubles as the open/closed state
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const menuOpen = Boolean(menuAnchor);

  const handleMenuClose = () => setMenuAnchor(null);

  const handleLogout = () => {
    handleMenuClose();
    logout(undefined, {
      onSuccess: () => {
        dispatch(clearUser());
      },
    });
  };

  return (
    <AppBar className="navbar" color="primary" position={position} elevation={0}>
      <Container maxWidth="xl">
        <Toolbar className="navbar__toolbar" disableGutters>
          {/* Left: brand + links */}
          <div className="navbar__start">
            <NavLink className="navbar__brand" to={isAuthenticated ? "/home" : "/"}>
              Know-a-Guy
            </NavLink>

            {isAuthenticated && (
              <>
                <span className="navbar__divider" aria-hidden="true" />
                <nav className="navbar__links" aria-label="Main">
                  {NAV_LINKS.map(({ label, to }) => (
                    <NavLink key={to} className="navbar__link" to={to}>
                      {label}
                    </NavLink>
                  ))}
                </nav>
              </>
            )}
          </div>

          {/* Center: welcome message */}
          <div className="navbar__center">
            {isAuthenticated && (
              <>
                <span className="navbar__greeting">
                  {getGreeting()}
                  {firstName && (
                    <>
                      , <span className="navbar__name">{firstName}</span>
                    </>
                  )}
                </span>
                <span className="navbar__subtext">
                  What do you need help with today?
                </span>
              </>
            )}
          </div>

          {/* Right: actions */}
          <div className="navbar__end">
            {isAuthenticated ? (
              <>
                <IconButton
                  className={`navbar__avatar-btn${menuOpen ? " navbar__avatar-btn--open" : ""}`}
                  aria-label="Account menu"
                  aria-haspopup="menu"
                  aria-controls={menuOpen ? "account-menu" : undefined}
                  aria-expanded={menuOpen}
                  onClick={(event) => setMenuAnchor(event.currentTarget)}
                >
                  <PersonIcon />
                </IconButton>

                <Menu
                  id="account-menu"
                  anchorEl={menuAnchor}
                  open={menuOpen}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  classes={{ paper: "navbar__menu" }}
                >
                  {/* Profile route doesn't exist yet; update the path when you add it */}
                  <MenuItem
                    className="navbar__menu-item"
                    component={NavLink}
                    to="/profile"
                    onClick={handleMenuClose}
                  >
                    <ListItemIcon>
                      <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                  </MenuItem>

                  <Divider className="navbar__menu-divider" />

                  <MenuItem
                    className="navbar__menu-item navbar__menu-item--danger"
                    onClick={handleLogout}
                  >
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  className="navbar__btn"
                  color="inherit"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>

                <Button
                  className="navbar__btn navbar__btn--solid"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}