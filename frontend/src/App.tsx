import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';
import theme from './themes/theme.ts';
import { Route, Routes } from 'react-router';
import LandingScreen from './screens/no-auth/LandingScreen.tsx';
import LoginScreen from './screens/no-auth/LoginScreen.tsx';
import SignupScreen from './screens/no-auth/SignupScreen.tsx';
import { useMe } from './hooks/auth/useMe.ts';
import { useEffect } from 'react';
import { useAppDispatch } from './redux/hooks.ts';
import { setUser } from "./redux/features/auth/authSlice.ts";

function App() {
  const {data, isPending, isError} = useMe();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isPending && !isError && data != null) {
      dispatch(setUser(data!));
      return
    }
  }, [data]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Routes>
        <Route index element={<LandingScreen />}/>
        <Route path='/login' element={<LoginScreen />}/>
        <Route path='/signup' element={<SignupScreen />}/>
      </Routes>
    </ThemeProvider>
  )
}

export default App
