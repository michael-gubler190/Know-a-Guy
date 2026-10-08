import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';
import theme from './themes/theme.ts';
import { Route, Routes } from 'react-router';
import LandingScreen from './screens/no-auth/LandingScreen.tsx';
import LoginScreen from './screens/no-auth/LoginScreen.tsx';
import SignupScreen from './screens/no-auth/SignupScreen.tsx';
import { useMe } from './hooks/auth/useMe.ts';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks.ts';
import { setUser, clearUser } from "./redux/features/auth/authSlice.ts";
import ProtectedRoute from './components/Routes/ProtectedRoute.tsx';
import HomeScreen from './screens/auth/HomeScreen.tsx';
import LoadingScreen from './screens/LoadingScreen.tsx';
import PublicOnlyRoute from './components/Routes/PublicOnlyRoute.tsx';

function App() {
  const {data, isPending} = useMe();
  const dispatch = useAppDispatch();
  const {isInitializing} = useAppSelector(state => state.auth);

  useEffect(() => {
    if (isPending) return;
    if (data) dispatch(setUser(data));
    else dispatch(clearUser());
  }, [data, isPending, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {isInitializing ? (
        <LoadingScreen />
      ) : (
        <Routes>
          <Route element={<PublicOnlyRoute />}>
            <Route index element={<LandingScreen />}/>
            <Route path='/login' element={<LoginScreen />}/>
            <Route path='/signup' element={<SignupScreen />}/>
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path='/home' element={<HomeScreen />}/>
          </Route>
        </Routes>
      )}
    </ThemeProvider>
  )
}

export default App
