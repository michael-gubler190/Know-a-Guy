import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';
import Navbar from "./components/Global/Navbar.tsx";
import theme from './themes/theme.ts';
import Carousel from './components/Landing/Carousel.tsx';
import Hero from './components/Landing/Hero.tsx';
import WhyCustomersLove from './components/Landing/WhyCustomersLove.tsx';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Box>
        <Navbar />
        
        <Box sx={{ position: "relative" }}>
          <Carousel />
          <Hero />
        </Box>

        <WhyCustomersLove />
      </Box>
    </ThemeProvider>
  )
}

export default App
