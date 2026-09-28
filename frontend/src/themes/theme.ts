import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#4a7ba6", contrastText: "#FFFFFF" },
    secondary: { main: "#f9e1e0", contrastText: "#10193A" },
    text: { primary: "#10193A" },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Bricolage Grotesque Variable", "Inter", system-ui, -apple-system, sans-serif',
    button: { textTransform: "none", fontWeight: 700 },
  },
});

export default theme;