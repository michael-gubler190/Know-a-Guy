import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';
import theme from './themes/theme.ts';
import { Route, Routes } from 'react-router';
import LandingScreen from './screens/no-auth/LandingScreen.tsx';
import LoginScreen from './screens/no-auth/LoginScreen.tsx';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Routes>
        <Route index element={<LandingScreen />}/>
        <Route path='/login' element={<LoginScreen />}/>
      </Routes>
    </ThemeProvider>
  )
}

export default App
